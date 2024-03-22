package utils

import "golang.org/x/crypto/bcrypt"

func CheckPassword(userPassword string, correctPassword []byte) bool {
	if err := bcrypt.CompareHashAndPassword(correctPassword, []byte(userPassword)); err != nil {
		return false
	}

	return true
}
