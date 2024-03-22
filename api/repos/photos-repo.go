package repos

import (
	"github.com/Monicakodali/SEPROJECT/api/models"
	"github.com/jinzhu/gorm"
)

type PhtRepo struct {
	db *gorm.DB
}

func (phtRepo *PhtRepo) Init(db *gorm.DB) {
	phtRepo.db = db
}

func (phtRepo *PhtRepo) CreatePhoto(pht models.Photos) error {

	query := phtRepo.db.Create(&pht)
	if query.Error != nil {
		return query.Error
	}
	return nil
}
