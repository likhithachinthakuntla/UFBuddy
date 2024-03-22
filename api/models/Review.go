package models

import "time"

type Review struct {
	Review_user string    `gorm:"primaryKey" json:"Review_user"`
	Review_est  int       `gorm:"primaryKey" json:"Review_est"`
	Review      string    `json:"Review"`
	Rating      float64   `gorm:"not null" json:"Rating"`
	RevTime     time.Time `gorm:"type:datetime;" json:"revTime"`
}
