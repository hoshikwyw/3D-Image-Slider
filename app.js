document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const workSection = document.querySelector(".work")
    const cardsContainer = document.querySelector(".cards")
    const moveDistance = window.innerWidth * 5
    let currentXPosition = 0

    const lerp = (start, end, t) => {
        start + (end - start) * t
    }

    const gridCanvas = document.createElement("canvas")
    gridCanvas.id = "grid-canvas"
    workSection.appendChild(gridCanvas)
    const gridCtx = gridCanvas.getContext("2d")

    const resizeGridCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        [gridCanvas.width, gridCanvas.height] = [
            window.innerWidth * dpr,
            window.innerHeight * dpr
        ];
        [gridCanvas.style.width, gridCanvas.style.height] = [
            `${window.innerWidth}px`,
            `${window.innerHeight}px`
        ]
        gridCtx.scale(dpr, dpr)
    }
    resizeGridCanvas()

    const drawGrid = (scrollProgress = 0) => {
        gridCtx.fillStyle = "#000"
        gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height)
        gridCtx.fillStyle = "#f40c3f"
        const [dotSize, spacing] = [1, 30]
        const [rows, cols] = [
            Math.ceil(gridCanvas.height / spacing),
            Math.ceil(gridCanvas.width / spacing) + 15
        ]

        const offset = (scrollProgress * spacing * 10) % spacing

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                gridCtx.beginPath()
                gridCtx.arc(
                    x * spacing - offset,
                    y * spacing,
                    dotSize,
                    0,
                    Math.PI * 2
                )
                gridCtx.fill()
            }
        }
    }

    const lettersScene = new THREE.Scene()
    const lettersCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    lettersCamera.position.z = 20

    const lettersRenderer = new THREE.WebGLRenderer({
        antialise: true,
        alpha: true
    })
    lettersRenderer.setSize(window.innerWidth, window.innerHeight)
    lettersRenderer.setClearColor(0x000000, 0)
    lettersRenderer.setPixelRatio(window.devicePixelRatio)
    lettersRenderer.domElement.id = "letters-canvas"
    workSection.appendChild(lettersRenderer.domElement)

    const createTextAnimationPath = (yPos, amplitude) => {
        const points = []
        for (let i = 0; i < 20; i++) {
            const t = i / 20
            points.push(
                new THREE.Vector3(
                    -25 + 50 * t,
                    yPos + Math.sin(t * Math.PI) * -amplitude,
                    (1 - Math.pow(Math.abs(t - 0.5) * 2.2)) * -5
                )
            )
        }
        const curve = new THREE.CatmullRomCurve3(points)
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
            new THREE.LineBasicMaterial({
                color: 0x000, linewidth: 1
            })
        )
        line.curve = curve
        return line
    }
})

// 7:31