package models

//UFDining structure belongs to Establishment structure
type UFDining struct {
	Diner_Id int    `gorm:"primaryKey;not null;unique" json:"Diner_id"`
	Building string `json:"Building"`
	Room     string `json:"Room"`
	Url      string `json:"Url"`
}
