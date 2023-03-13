window.onload = function() {
    app.init()
}

class App {
    carsOnTheRoad = []
    allowedDirection = "vertical"
    
    init = () => {
        this.canvas = document.getElementById("canvas")
        this.context2d = this.canvas.getContext("2d")
        
        this.buttonsCreatingNewCars = document.querySelectorAll("main button.add-car-button-variant")
        this.buttonsCreatingNewCarsArray = [...this.buttonsCreatingNewCars]
        this.buttonsCreatingNewCarsArray.forEach( (button) => {
            button.addEventListener("click", this.addNewCar)
        })

        this.changeTrafficSignalButton = document.querySelector(".button-traffic-signal")
        this.changeTrafficSignalButton.addEventListener("click", this.changeTrafficSignal)
        
        
        this.startApp()
    }


    drawRoad = () => {
        this.context2d.fillStyle = "rgb(23, 26, 33)"
        this.context2d.fillRect(0,0,600,600)
        this.context2d.fillStyle = "rgb(78, 110, 93)"
        this.context2d.fillRect(0,0,260,260)
        this.context2d.fillRect(340,0,260,260)
        this.context2d.fillRect(0,340,260,260)
        this.context2d.fillRect(340,340,260,260)
        this.context2d.fillStyle = "white"
        this.context2d.fillRect(298,0,4,255)
        this.context2d.fillRect(298,345,4,255)
        this.context2d.fillRect(0,298,255,4)
        this.context2d.fillRect(345,298,255,4)
    }


    addNewCar = (e) => {
        const ridingFrom = e.target.getAttribute("data-riding-from")
        switch(ridingFrom) {
            case "up":
                this.startX = 265
                this.startY = -31
                this.dx = 0
                this.dy = 3
                break
            case "down":
                this.startX = 305
                this.startY = 599
                this.dx = 0
                this.dy = -3
                break
            case "left":
                this.startX = -31
                this.startY = 305
                this.dx = 3
                this.dy = 0
                break
            case "right":
                this.startX = 599
                this.startY = 265
                this.dx = -3
                this.dy = 0
            }

        
        
        let newCarObject = {
            posX: this.startX,
            posY: this.startY,
            posDX: this.dx,
            posDY: this.dy,
            startRidingFrom: ridingFrom,
            borderTop: this.posY,
            borderBottom: this.posY+30,
            borderLeft: this.posX,
            borderRight: this.posX+30,
            centerPointX: this.posX+15,
            centerPointY: this.posY+15
        }

        

        let counter=0
        this.carsOnTheRoad.forEach ( (carObject) => {
            if(carObject.startRidingFrom == newCarObject.startRidingFrom) {
                counter++   
            } 
        })

        if (counter == 0) {
            this.carsOnTheRoad.push(newCarObject)
        } else { counter = 0 }

    }


    drawCars = () => {
        this.carsOnTheRoad.forEach ( (carObject) => {
            this.context2d.fillStyle = "rgb(0, 167, 225)"

            this.context2d.fillRect(carObject.posX, carObject.posY, 30,30)
        })
    }


    carsAreDrivingParameters  = (carObject) => {
        carObject.posX = carObject.posX + carObject.posDX
        carObject.posY = carObject.posY + carObject.posDY
        carObject.borderTop = carObject.posY
        carObject.borderBottom = carObject.posY+30
        carObject.borderLeft = carObject.posX
        carObject.borderRight = carObject.posX+30
        carObject.centerPointX = carObject.posX+15
        carObject.centerPointY = carObject.posY+15

    }

    
    carsAreDriving = () => {
        this.carsOnTheRoad.forEach ( (carObject) => {

            if (this.allowedDirection === "vertical" 
            && carObject.startRidingFrom === "up") {
                this.carsAreDrivingParameters(carObject)
            }
            else if (this.allowedDirection === "vertical" 
            && carObject.startRidingFrom === "down") {
                this.carsAreDrivingParameters(carObject)
            }
            else if (this.allowedDirection === "vertical" 
            && carObject.startRidingFrom === "left") {
                if (carObject.posX < 225 || carObject.posX > 230 ) {
                    this.carsAreDrivingParameters(carObject)
                }  
            }
            else if (this.allowedDirection === "vertical" 
            && carObject.startRidingFrom === "right") {
                if (carObject.posX < 340 || carObject.posX > 345) {
                    this.carsAreDrivingParameters(carObject)
                }
            }
            
            else if (this.allowedDirection === "horizontal" 
            && carObject.startRidingFrom === "up") {
                if (carObject.posY < 225 || carObject.posY > 230) {
                    this.carsAreDrivingParameters(carObject)
                }
            }
            else if (this.allowedDirection === "horizontal" 
            && carObject.startRidingFrom === "down") {
                if (carObject.posY < 340 || carObject.posY > 345) {
                    this.carsAreDrivingParameters(carObject)
                }
            }
            else if (this.allowedDirection === "horizontal" 
            && carObject.startRidingFrom === "left") {
                this.carsAreDrivingParameters(carObject)
            }
            else if (this.allowedDirection === "horizontal" 
            && carObject.startRidingFrom === "right") {
                this.carsAreDrivingParameters(carObject)
            }
            
        })
    }



    setSignalDevice = () => {
        this.signalDeviceUpDiv = document.querySelector(".signal-device-up")
        this.signalDeviceDownDiv = document.querySelector(".signal-device-down")
        this.signalDeviceLeftDiv = document.querySelector(".signal-device-left")
        this.signalDeviceRightDiv = document.querySelector(".signal-device-right")
        if (this.allowedDirection === "vertical") {
            this.signalDeviceUpDiv.style.backgroundColor = "#01ff01"
            this.signalDeviceDownDiv.style.backgroundColor = "#01ff01"
            this.signalDeviceLeftDiv.style.backgroundColor = "#ff0000"
            this.signalDeviceRightDiv.style.backgroundColor = "#ff0000"
        }
        if (this.allowedDirection === "horizontal") {
            this.signalDeviceUpDiv.style.backgroundColor = "#ff0000"
            this.signalDeviceDownDiv.style.backgroundColor = "#ff0000"
            this.signalDeviceLeftDiv.style.backgroundColor = "#01ff01"
            this.signalDeviceRightDiv.style.backgroundColor = "#01ff01"
        }
    }



    changeTrafficSignal = () => {
        if (this.allowedDirection == "vertical") { 
            this.allowedDirection = "horizontal" 
        } else if (this.allowedDirection == "horizontal") { 
            this.allowedDirection = "vertical" 
        }
    }

    

    //uproszczona kolizja
    checkCollision = () => {

        this.carsOnTheRoad.forEach ( (SingleCarObject, SingleCarObjectIndex) => {

            this.carsOnTheRoad.forEach ( (SingleCarObjectFromMany,SingleCarObjectFromManyIndex) => {
                if ( SingleCarObjectIndex != SingleCarObjectFromManyIndex
                    && SingleCarObject.centerPointX > SingleCarObjectFromMany.borderLeft 
                    && SingleCarObject.centerPointX < SingleCarObjectFromMany.borderRight
                    && SingleCarObject.centerPointY > SingleCarObjectFromMany.borderTop
                    && SingleCarObject.centerPointY < SingleCarObjectFromMany.borderBottom                    
                    ) {

                    window.location.reload()
                    console.log("kolizja")
                }
            })    
         })

    }



    deleteOutOfCanvasCars = () => {
        this.carsOnTheRoad.forEach ( (SingleCarObject, SingleCarObjectIndex) => {
            if (SingleCarObject.centerPointX < -100 
                || SingleCarObject.centerPointX > 670
                || SingleCarObject.centerPointY < -100 
                || SingleCarObject.centerPointY > 670
                
            ) { 
                this.carsOnTheRoad.splice(SingleCarObjectIndex,1)
            }
        })
    }

    
    startApp = () => {
        const fps = 60
        setInterval(this.updateGame, 1000/fps)
    }


    updateGame = () => {
        this.drawRoad()
        this.drawCars()
        this.setSignalDevice()
        this.carsAreDriving()
        this.checkCollision()
        this.deleteOutOfCanvasCars()
    }

}

const app = new App()