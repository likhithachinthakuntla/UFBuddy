package repos

import (
	"github.com/likhithachinthakuntla/UFBuddy/api/models"
	"github.com/likhithachinthakuntla/UFBuddy/api/utils"
	"github.com/jinzhu/gorm"
)

type UsrRepo struct {
	db *gorm.DB
}

type UserError struct {
	message string
}

func (e UserError) Error() string {
	return e.message
}

func (usrRepo *UsrRepo) Init(db *gorm.DB) {
	usrRepo.db = db
}

func (usrRepo *UsrRepo) GetUser(username string, password string) (models.User, error) {

	var myUser models.User

	query := usrRepo.db.Where("Username = ?", username).First(&myUser)
	if query.Error != nil {
		return myUser, query.Error
	}

	passwordMatch := utils.CheckPasswordHash(password, myUser.Password)

	if !passwordMatch {
		return myUser, UserError{"Passwords don't match"}
	}

	return myUser, nil
}

func (usrRepo *UsrRepo) GetAllUsers() ([]models.User, error) {

	var userList []models.User

	query := usrRepo.db.Find(&userList)
	if query.Error != nil {
		return nil, query.Error
	}
	return userList, nil
}

func (usrRepo *UsrRepo) AddUser(newUser models.User) error {

	query := usrRepo.db.Create(&newUser)
	if query.Error != nil {
		return query.Error
	}
	return nil
}

func (usrRepo *UsrRepo) RemoveUser(username string) error {

	query := usrRepo.db.Delete(&models.User{}, username)
	if query.Error != nil {
		return query.Error
	}
	return nil
}
