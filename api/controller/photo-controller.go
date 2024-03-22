package controller

import (
	"github.com/Monicakodali/SEPROJECT/api/repos"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type PhtController struct {
	phtRepo *repos.PhtRepo
}

func (pRepo *PhtController) Init(db *gorm.DB) {
	pRepo.phtRepo = &repos.PhtRepo{}
	pRepo.phtRepo.Init(db)
}
