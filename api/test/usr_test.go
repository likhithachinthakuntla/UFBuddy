package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/likhithachinthakuntla/UFBuddy/api/controller"
	"github.com/likhithachinthakuntla/UFBuddy/api/models"
	"github.com/likhithachinthakuntla/UFBuddy/api/utils"
	"github.com/gin-gonic/gin"
)

func TestRegister(t *testing.T) {
	db, err := utils.GetDBInstance()
	if err != nil {
		panic("failed to connect database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()
	//fmt.Println(db)

	router := gin.New()

	userController := controller.UserController{}
	userController.Init(db)

	router.POST("/api/users", userController.SignUp)
	var jsonStr = []byte(`{
		"Username": "mmisra",
			"Email":    "mmisra@ufl.edu",
			"Name":     "Manjari Misra",
			"Password": "xyz245",
			"Verified": 0
	  }`)
	w := httptest.NewRecorder()
	b, _ := json.Marshal(jsonStr)
	req, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(b))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	router.ServeHTTP(w, req)

	var jsonStr2 = []byte(`{
		"Username": "carolp",
			"Email":    "mmisra@ufl.edu",
			"Name":     "Carol Pagolu Misra",
			"Password": "xyz245",
			"Verified": 0
	  }`)
	w1 := httptest.NewRecorder()
	b1, _ := json.Marshal(jsonStr2)
	req1, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(b1))
	req1.Header.Set("Content-Type", "application/json; charset=UTF-8")
	router.ServeHTTP(w1, req1)
}

func TestGetUser(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.New()

	userController := controller.UserController{}
	userController.Init(db)

	router.GET("/api/users", userController.GetUser)

	var jsonStr = []byte(`{"Email": "mmisra@ufl.edu"}`)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/users", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	q := req.URL.Query()
	q.Add("User Email", string(jsonStr))
	router.ServeHTTP(w, req)

}

func TestRemoveUser(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.New()

	userController := controller.UserController{}
	userController.Init(db)

	router.POST("/api/establishments", userController.SignUp)
	router.GET("/api/establishments", userController.GetUser)
	router.DELETE("/api/establishments", userController.DeleteUser)

	var jsonStr = []byte(`{}`)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/api/users", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

}
