package utils

// Contains tells whether a string contains the substring 'x'.
func Contains(a []string, x string) bool {
	for _, n := range a {
		if x == n {
			return true
		}
	}
	return false
}
