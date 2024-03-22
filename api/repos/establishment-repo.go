package repos

import (
	"fmt"
	"strconv"
	"time"

	"github.com/likhithachinthakuntla/UFBuddy/api/models"
	"github.com/jinzhu/gorm"
)

type EstRepo struct {
	db *gorm.DB
}

func (estRepo *EstRepo) Init(db *gorm.DB) {
	estRepo.db = db
}

type Result struct {
	Est_Id       int
	Name         string
	X_coordinate float64
	Y_coordinate float64
	IsOpen       int
	Building     string
	Room         string
	Url          string
	AvgRating    float64
	TotalRatings int
	RecentRating string
	RatingTime   time.Time
}

type RevCount struct {
	AvgRating   float64
	TotalRating int
}

type RecentReview struct {
	RevTime time.Time
	Review  string
}

func (estRepo *EstRepo) GetEstByID(eid string) (Result, error) {
	var res Result
	//var establishments models.Establishment
	est_id, err := strconv.Atoi(eid)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(est_id)
	query := estRepo.db.Debug().Raw("SELECT e.est_id, e.name, e.x_coordinate, e.y_coordinate, e.is_open, d.building, d.room, d.url FROM establishments e INNER JOIN uf_dinings d ON  e.est_id = d.diner_id WHERE e.est_id = ?", est_id).Scan(&res)
	if query.Error != nil {
		return res, query.Error
	}

	recentRev, err := estRepo.GetRecentRevForEst(est_id)

	if err != nil {
		return res, err
	}

	ratings, err := estRepo.CountReviewsForEst(est_id)

	if err != nil {
		return res, err
	}

	fmt.Println(ratings)

	res.TotalRatings = ratings.TotalRating
	res.AvgRating = ratings.AvgRating
	res.RecentRating = recentRev.Review
	res.RatingTime = recentRev.RevTime

	return res, nil
}

func (estRepo *EstRepo) GetAllEst() ([]Result, error) {

	var results []Result

	query := estRepo.db.Debug().Raw("SELECT e.est_id, e.name, e.x_coordinate, e.y_coordinate, e.is_open, d.building, d.room, d.url FROM establishments e INNER JOIN uf_dinings d ON  e.est_id = d.diner_id").Scan(&results)
	if query.Error != nil {
		return nil, query.Error
	}

	return results, nil
}

func (estRepo *EstRepo) CreateEst(estab models.Establishment) error {

	query := estRepo.db.Create(&estab)
	if query.Error != nil {
		return query.Error
	}
	return nil
}

func (estRepo *EstRepo) DeleteEst(eid string) error {

	est_id, err := strconv.Atoi(eid)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(est_id)
	query := estRepo.db.Where("est_id = ?", est_id).Delete(&models.Establishment{})
	if query.Error != nil {
		return query.Error
	}
	return nil
}

func (estRepo *EstRepo) CountReviewsForEst(est_id int) (RevCount, error) {

	var total_revs RevCount
	query := estRepo.db.Debug().Raw("SELECT AVG(reviews.rating) as AvgRating, COUNT(*) as totalRating FROM reviews where reviews.review_est=?", est_id).Scan(&total_revs)
	if query.Error != nil {
		return total_revs, query.Error
	}
	fmt.Println(total_revs)
	return total_revs, nil
}

func (estRepo *EstRepo) GetRecentRevForEst(est_id int) (RecentReview, error) {

	var reviewList RecentReview
	query := estRepo.db.Debug().Raw("SELECT  reviews.rev_time, reviews.review FROM reviews where reviews.review_est=? ORDER BY reviews.rev_time DESC LIMIT 1", est_id).Scan(&reviewList)

	if query.Error != nil {
		return reviewList, query.Error
	}
	return reviewList, nil
}
