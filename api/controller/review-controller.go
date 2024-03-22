package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/Monicakodali/SEPROJECT/api/models"
	"github.com/Monicakodali/SEPROJECT/api/repos"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type ReviewController struct {
	revRepo *repos.RevRepo
}

func (rInstance *ReviewController) Init(db *gorm.DB) {
	rInstance.revRepo = &repos.RevRepo{}
	rInstance.revRepo.Init(db)
}

// Get all reviews ever posted
func (rev *ReviewController) ListReviews(c *gin.Context) {

	res, err := rev.revRepo.GetAllReviews()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, &res)
}

// Get all reviews for an establishment
func (rev *ReviewController) GetReviewsForEst(c *gin.Context) {

	eid := c.Param("est_Id")
	res, err := rev.revRepo.GetReviewsForEst(eid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, &res)
}

// Get all the reviews given by a user
func (rev *ReviewController) GetReviewsForUser(c *gin.Context) {

	eid := c.Param("userId")
	res, err := rev.revRepo.GetReviewsForUser(eid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, &res)
}

// Add a new review
func (rev *ReviewController) NewReview(ctx *gin.Context) {
	var rInstance models.Review
	if err := ctx.ShouldBindJSON(&rInstance); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := rev.revRepo.AddReview(rInstance)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, rInstance)
}

// Remove a review

func (rev *ReviewController) RemoveReview(ctx *gin.Context) {
	rid := ctx.Param("inputParams")
	fmt.Println(rid)
	inp := strings.Split(rid, ",")

	err := rev.revRepo.DeleteReview(inp[0], inp[1])
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	ctx.Status(http.StatusNoContent)
}
