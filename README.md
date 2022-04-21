# EndPoints

List of Available Endpoints:

- POST /register
- POST /login
- GET /products
- POST /products
- PUT /products/:productId
- GET /products/:productId
- PATCH /products/:productId
- POST /products/:productId/payment

## POST /users/register

**Description**

- Create User as admin

**Request**

- Body

```
{
    "message": "Success create user"
}
```

**Response**

_201 Created_

- Body

```
{
    "email": String,
    "password": String
}
```

_400 Bad Request_

- Body

```
{
    "message": "Email is required"
}
OR
{
    "message": "email must be unique"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Invalid email format"
}
```

## POST /users/login

**Description**

- Login User as admin

**Request**

- Body

```
{
  "email": String,
  "password": String
}
```

**Response**

_200 OK_

- Body

```
{
    "acces_token"
}
```

_404 Not Found_

- Body

```
{
    "message": "Invalid username/pasword"
}
```

## POST /products

**Description**

- Get all Product

**Request**

- Headers

```
{
  "access_token": String
}
```

**Response**

```
[
  {
    "id": 1,
    "name": "test1",
    "imgUrl": "https://picsum.photos/100/100",
    "price": 50000,
    "status": "notAvailable",
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2022-04-20T14:30:17.829Z",
    "updatedAt": "2022-04-20T14:30:17.829Z"
  },
  {
    "id": 2,
    "name": "test2",
    "imgUrl": "https://picsum.photos/100/100",
    "price": 1500000,
    "status": "notAvailable",
    "UserId": 1,
    "CategoryId": 2,
    "createdAt": "2022-04-20T14:31:50.107Z",
    "updatedAt": "2022-04-20T14:31:50.107Z"
  }
]
```

## PUT /products/:productId

**Description**

- Buy product

**Request**

- Headers

```
{
  "access_token": String
}
```

- Params

```
{
  productId: req.params.productId
}
```

- Body

```
{
  "message": String
}
```

**Response**

```
{
  "message": "success buy product"
}

```

## GET /products/:productId

**Description**

- Get product by id

**Request**

```
{
  "productId": req.params.productId
}
```

**Response**

```
{
  "id": 1,
  "name": "test1",
  "imgUrl": "https://picsum.photos/100/100",
  "price": 50000,
  "status": "notAvailable",
  "UserId": 1,
  "CategoryId": 1,
  "createdAt": "2022-04-20T14:30:17.829Z",
  "updatedAt": "2022-04-20T14:30:17.829Z"
}
```

## POST /products/:productId/payment

**Description**

- Create token for payment

**Request**

```
{
  "productId": req.params.productId
}
```

**Response**

```
{
  "message": "success buy product"
}
```

## Global Error

```
{
  "message": "You're not Auhotorized"
}
OR
{
  "message": "Internal Server Error"
}
```
