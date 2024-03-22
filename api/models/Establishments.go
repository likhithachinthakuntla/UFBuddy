package models

//establishment structure
type Establishment struct {
	Est_Id       int      `gorm:"primary_key;not null;unique" json:"est_id"`
	Type         string   `gorm:"not null" json:"Type"`
	Name         string   `json:"Name"`
	X_coordinate float64  `json:"x"`
	Y_coordinate float64  `json:"y"`
	IsOpen       int      `gorm:"default:0" json:"isOpen"`
	Image_Id     string   `json:"img_url"`
	Reviews      []Review `gorm:"foreignKey:Review_est;references:Est_Id"`
	Tagnames     []Tags   `gorm:"foreignKey:Tag(Est_id);references:establishment(Est_Id)"`
	Images       Photos   `gorm:"foreignKey:Photos(photo_id);references:establishment(Image_Id)"`
}
