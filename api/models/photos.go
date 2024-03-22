package models

type Photos struct {
	PhotoID  string `gorm:"primaryKey;not null;unique" json:"pid"`
	PhotoUrl string `json:"url"`
}
