package controller

import (
	"fmt"
	"net/http"

	"github.com/likhithachinthakuntla/UFBuddy/api/models"
	"github.com/likhithachinthakuntla/UFBuddy/api/repos"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type EstController struct {
	estRepo *repos.EstRepo
}

func (eRepo *EstController) Init(db *gorm.DB) {
	eRepo.estRepo = &repos.EstRepo{}
	eRepo.estRepo.Init(db)
}

func (est *EstController) GetOneEstHandler(ctx *gin.Context) {

	eid := ctx.Param("est_id")
	res, err := est.estRepo.GetEstByID(eid)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, &res)
}

func (est *EstController) ListEstHandler(c *gin.Context) {

	res, err := est.estRepo.GetAllEst()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, &res)
}

func (est *EstController) CreateEstablishments(ctx *gin.Context) {

	var eInstance models.Establishment

	if err := ctx.ShouldBindJSON(&eInstance); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := est.estRepo.CreateEst(eInstance)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, eInstance)
}

func (est *EstController) DeleteEstablishment(ctx *gin.Context) {
	eid := ctx.Param("est_id")
	fmt.Println(eid)
	err := est.estRepo.DeleteEst(eid)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusNoContent)
}
