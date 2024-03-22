package test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Monicakodali/SEPROJECT/api/controller"
	"github.com/Monicakodali/SEPROJECT/api/models"
	"github.com/Monicakodali/SEPROJECT/api/utils"
	"github.com/gin-gonic/gin"
)

func TestInsertEstablishment(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.Establishment{})
	defer db.Close()

	router := gin.New()

	establishmentController := controller.EstController{}
	establishmentController.Init(db)

	router.POST("/api/establishments", establishmentController.CreateEstablishments)

	var jsonStr = []byte(`{
		"id": "7983",
		"type": "DINING",
		"name": "Abrwws",
		"building": "0243",
		"room": "0100X",
		"url": "",
		"x": 29.655182375855586,
		"y": -82.34634038186434
	  }`)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/establishments", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "applocation/json")
	router.ServeHTTP(w, req)

	var jsonStr2 = []byte(`{
		"id": "82",
		"type": "DINING",
		"name": "P.O.D. Market",
		"building": "0551",
		"room": "173",
		"url": "",
		"x": 29.64636443982178,
		"y": -82.34316087863382
	  }`)
	w1 := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/api/establishments", bytes.NewBuffer(jsonStr2))
	req1.Header.Set("Content-Type", "applocation/json")
	router.ServeHTTP(w1, req1)

}
func TestGetEstablishment(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.Establishment{})
	defer db.Close()

	router := gin.New()

	establishmentController := controller.EstController{}
	establishmentController.Init(db)

	router.GET("/api/establishments", establishmentController.GetOneEstHandler)

	var jsonStr = []byte(`{"id": "7984"}`)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/establishments", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	q := req.URL.Query()
	q.Add("Establishment ID", string(jsonStr))
	router.ServeHTTP(w, req)

}

func TestRemoveEstablishment(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.Establishment{})
	defer db.Close()

	router := gin.New()

	establishmentController := controller.EstController{}
	establishmentController.Init(db)

	router.POST("/api/establishments", establishmentController.GetOneEstHandler)
	router.GET("/api/establishments", establishmentController.GetOneEstHandler)
	router.DELETE("/api/establishments", establishmentController.GetOneEstHandler)

	var jsonStr = []byte(`{}`)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/api/establishments", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

}
