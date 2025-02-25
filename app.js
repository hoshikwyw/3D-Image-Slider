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
    }
})