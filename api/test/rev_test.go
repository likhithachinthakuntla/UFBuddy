package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Monicakodali/SEPROJECT/api/controller"
	"github.com/Monicakodali/SEPROJECT/api/models"
	"github.com/Monicakodali/SEPROJECT/api/utils"
	"github.com/gin-gonic/gin"
)

func TestCreateReview(t *testing.T) {
	db, err := utils.GetDBInstance()
	if err != nil {
		panic("failed to connect database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.Review{})
	defer db.Close()
	//fmt.Println(db)

	router := gin.New()

	reviewController := controller.ReviewController{}
	reviewController.Init(db)

	router.POST("/api/users", reviewController.NewReview)

	var jsonStr = []byte(`{
    "Review_user": "cpagolu",
    "Review": "Great Service!",
    "Review_est": 6,
    "Rating": 4}`)

	w := httptest.NewRecorder()
	//b, _ := json.Marshal(jsonStr)
	req, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	var jsonStr2 = []byte(`{
		"Review_user": "cpagolu",
		"Review": "Great Service!",
		"Review_est": 87,
		"Rating": 4}`)
	w1 := httptest.NewRecorder()
	b1, _ := json.Marshal(jsonStr2)
	req1, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(b1))
	req1.Header.Set("Content-Type", "application/json; charset=UTF-8")
	router.ServeHTTP(w1, req1)
}

func TestGetReviewForEst(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.New()

	revController := controller.ReviewController{}
	revController.Init(db)

	router.GET("/api/reviews/est/:est_Id", revController.GetReviewsForEst)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/reviews/est/82", nil)
	router.ServeHTTP(w, req)

	w1 := httptest.NewRecorder()
	req1, _ := http.NewRequest("GET", "/api/reviews/est/0", nil)
	router.ServeHTTP(w1, req1)

}

func TestGetReviewForUser(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.New()

	revController := controller.ReviewController{}
	revController.Init(db)

	router.GET("/api/reviews/user/:userId", revController.GetReviewsForUser)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/reviews/user/monica", nil)
	router.ServeHTTP(w, req)

	w1 := httptest.NewRecorder()
	req1, _ := http.NewRequest("GET", "/api/reviews/user/gggggf", nil)
	router.ServeHTTP(w1, req1)
}

func TestRemoveReview(t *testing.T) {

	//check DB connection
	db, err := utils.GetDBInstance()
	if err != nil {
		t.Fatal("Couldn't connect to Database")
	}
	db.LogMode(true)
	db.Debug().AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.New()

	revController := controller.ReviewController{}
	revController.Init(db)

	router.DELETE("/api/reviews/:inputParams", revController.RemoveReview)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/api/reviews/4,cpagolu", nil)
	router.ServeHTTP(w, req)

}
