
type Establishment = {
  id: string,
  Name: string
  building: string,
  room: string,
  url: string,
  x: number,
  y: number,
  type: 'restaurant' | 'museum' | 'library' | 'building'
}

type Diner = {
  Est_Id: string,
  Type: string
  Name: string,
  Building: string,
  Room: string,
  Url: string,
  X_coordinate: number,
  Y_coordinate: number
}

type Review = {
  Review_Id: number,
  Review_user: string,
  Review_est: int,
  Review: string,
  Rating: number,
  revTime: string
}

type User = {
  Username: string,
  Email?: string,
  FirstName: string,
  LastName: string,
  Address?: string
  Password?: string,
  Verified?: 1 | 0
}

type EstFilters = {
  minStars: number,
  openNow: boolean
}