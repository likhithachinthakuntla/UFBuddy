package repos

import (
	"fmt"
	"strconv"
	"time"

	"github.com/Monicakodali/SEPROJECT/api/models"
	"github.com/jinzhu/gorm"
)

type RevRepo struct {
	db *gorm.DB
}

func (revRepo *RevRepo) Init(db *gorm.DB) {
	revRepo.db = db
}

// Get all reviews
func (revRepo *RevRepo) GetAllReviews() ([]models.Review, error) {

	var reviewList []models.Review

	query := revRepo.db.Debug().Find(&reviewList)
	if query.Error != nil {
		return nil, query.Error
	}
	return reviewList, nil
}

// Get all the reviews for an establishment
func (revRepo *RevRepo) GetReviewsForEst(est_id string) ([]models.Review, error) {

	eid, err := strconv.Atoi(est_id)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(est_id, eid)
	var reviewList []models.Review
	query := revRepo.db.Debug().Where("Review_est = ?", eid).Find(&reviewList)

	if query.Error != nil {
		return nil, query.Error
	}
	return reviewList, nil
}

// Get all the reviews given by a user
func (revRepo *RevRepo) GetReviewsForUser(username string) ([]models.Review, error) {

	var reviewList []models.Review
	query := revRepo.db.Where("Review_user = ?", username).Find(&reviewList)

	if query.Error != nil {
		return nil, query.Error
	}
	return reviewList, nil
}

// Add reviews into the table
func (revRepo *RevRepo) AddReview(newReview models.Review) error {
	fmt.Println("ADDING.....")
	newReview.RevTime = time.Now()
	query := revRepo.db.Debug().Create(&newReview)
	//Raw("INSERT INTO reviews (review_user, review_est,review, rating, rev_time ) VALUES (?,?,?,?)", newReview.Review_user, newReview.Review_est, newReview.Review, newReview.Rating, newReview.RevTime).Scan(&newReview)
	//revRepo.db.Debug().Create(&newReview)
	if query.Error != nil {
		return query.Error
	}
	return nil
}

// Delete a review
func (revRepo *RevRepo) DeleteReview(rev_est string, rev_user string) error {

	est_id, err := strconv.Atoi(rev_est)
	if err != nil {
		fmt.Println(err)
	}

	query := revRepo.db.Where("Review_est = ? AND Review_user = ?", est_id, rev_user).Delete(&models.Review{})
	if query.Error != nil {
		return query.Error
	}
	return nil
}
