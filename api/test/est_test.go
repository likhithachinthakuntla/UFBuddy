package test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/likhithachinthakuntla/UFBuddy/api/controller"
	"github.com/likhithachinthakuntla/UFBuddy/api/models"
	"github.com/likhithachinthakuntla/UFBuddy/api/utils"
	"github.com/gin-gonic/gin"
)

func TestInsertEstablishment(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		panic("failed to connect database")
	}
	db.LogMode(true)
	db.Debug().Exec("PRAGMA foreign_keys = ON")

	db.Debug().AutoMigrate(&models.Establishment{}, &models.UFDining{}, &models.Review{}, &models.User{}, &models.Photos{}, &models.Tags{})
	defer db.Close()

	router := gin.New()

	establishmentController := controller.EstController{}
	establishmentController.Init(db)

	router.POST("/api/establishments", establishmentController.CreateEstablishments)

	var jsonStr = []byte(`{
		"est_id": 4,
		"Type": "DINING",
		"Name": "Abras",
		"x": 29.655182375855586,
		"y": -82.34634038186434
	  }`)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/establishments", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "applocation/json")
	router.ServeHTTP(w, req)

	var jsonStr2 = []byte(`{
		"est_id": 82,
		"Type": "DINING",
		"Name": "P.O.D. Market",
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

	router.GET("/api/establishments", establishmentController.ListEstHandler)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/establishments", nil)
	// a := req.Header.Get("Content-Type")
	// fmt.Println(a)
	router.ServeHTTP(w, req)

}

func TestGetOneEstablishment(t *testing.T) {

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

	router.GET("/api/establishments/:est_id", establishmentController.GetOneEstHandler)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/establishments/87", nil)
	// a := req.Header.Get("Content-Type")
	// fmt.Println(a)
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

	router.DELETE("/api/establishments/:est_id", establishmentController.DeleteEstablishment)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/api/establishments/4", nil)
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

}
