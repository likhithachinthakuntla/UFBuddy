package utils

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

var DB *gorm.DB

func GetDB() *gorm.DB {
	DB, err := GetDBInstance()
	if err != nil {
		panic(fmt.Sprintf("DB: %v", err))
	}
	return DB
}

// GetDB method returns a DB instance
func GetDBInstance() (*gorm.DB, error) {
	conn, err := gorm.Open("sqlite3", "/Users/carolnavya/SEPROJECT/ufYelp.db")
	if err != nil {
		panic(fmt.Sprintf("DB: %v", err))
	}
	DB = conn
	return conn, nil
}
