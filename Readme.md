# Customer Management API

This API provides endpoints for managing customer data.  It uses Express.js, Mongoose (for MongoDB), and other libraries.

## Environment Variables

Before running the API, you need to set the following environment variables:

* `MONGO_URI`: The connection string for your MongoDB database.
* `PORT`: The port number the server should listen on (defaults to 3000).

These variables should be stored in a `.env` file in the server's root directory (and added to your `.gitignore` to prevent accidental commits).  Example `.env` file:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority
PORT=3001
```

## API Endpoints

All endpoints are prefixed with `/api`.

**Customers:**

| Method | Endpoint                  | Description                                         | Request Body                                      | Response Body                               | Status Codes                               |
|--------|---------------------------|-----------------------------------------------------|-------------------------------------------------|---------------------------------------------|-------------------------------------------|
| POST    | `/createcustomer`         | Create a new customer.                             | `{ fullName, fathersName, address, contactNumber, [other fields] }` | `{ res: 'Succesfully Created Customer' }`     | 201 (Created), 500 (Internal Server Error) |
| GET     | `/getallcustomers`        | Get all customers.                                 | None                                             | `[{ customer data }, ...]`                   | 200 (OK), 500 (Internal Server Error)     |
| GET     | `/getcustomersbyid/:id`   | Get a single customer by ID.                      | None                                             | `{ customer data }` or `{ error: 'Customer not found' }` | 200 (OK), 404 (Not Found), 500 (Internal Server Error) |
| GET     | `/getcustomersbycode/:customerCode` | Get a single customer by customer code.           | None                                             | `{ customer data }` or `{ error: 'Customer not found' }` | 200 (OK), 404 (Not Found), 500 (Internal Server Error) |
| PUT     | `/updatecustomer/:id`     | Update a customer by ID.                           | `{ updated customer data }`                     | `{ updated customer data }` or `{ error: 'Customer not found' }` | 200 (OK), 404 (Not Found), 500 (Internal Server Error) |
| DELETE  | `/deletecustomer/:id`     | Delete a customer by ID.                           | None                                             | `{ message: 'Customer deleted successfully' }` or `{ error: 'Customer not found' }` | 200 (OK), 404 (Not Found), 500 (Internal Server Error) |
| POST    | `/customers/bulk`        | Create multiple customers in a single request.     | `[{ customer data }, ...]`                     | `{ message, addedCustomers, failedCustomers }` | 201 (Created), 500 (Internal Server Error) |


**Customer Data Fields:**

The API accepts the following fields for customer data (some are optional):

* `customerCode` (String, automatically generated): Unique customer code.
* `fullName` (String, required): Full name of the customer.
* `fathersName` (String, required): Father's name of the customer.
* `address` (String, required): Customer's address.
* `contactNumber` (String, required): Customer's primary contact number.
* `contactNumber2` (String, optional): Customer's secondary contact number.
* `facebookId` (String, optional): Customer's Facebook ID.
* `caste` (String, optional): Customer's caste.
* `openingAccountBalance` (Number, required): Customer's initial account balance.
* `status` (String, optional): Customer's status (e.g., "active", "inactive").
* `accountType` (String, optional): Type of customer account.
* `dateOfRegistration` (Date, automatically set): Date of registration.
* `gender` (String, required): Customer's gender.
* `dateOfBirth` (Date, required): Customer's date of birth.
* `note` (String, optional): Any additional notes about the customer.
* `lastPurchaseDate` (Date, optional): Date of the customer's last purchase.
* `createdAt` (Date, automatically set): Date of creation.
* `updatedAt` (Date, automatically set): Date of last update.
* `profilePicture` (String, optional): URL of customer's profile picture.


## Error Handling

The API returns standard HTTP status codes to indicate success or failure. Error responses include a JSON object with an `error` property describing the problem.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set environment variables.
4.  Start the server: `npm start`

## Example using cURL

```bash
**1. Create a New Customer (POST /api/createcustomer)**

**Request:**

```json
{
  "fullName": "Jane Doe",
  "fathersName": "Robert Doe",
  "address": "456 Oak Ave",
  "contactNumber": "555-5678",
  "openingAccountBalance": 500,
  "gender": "Female",
  "dateOfBirth": "1985-10-20"
}
```

**Response (201 Created):**

```json
{
  "res": "Succesfully Created Customer"
}
```

**Response (500 Internal Server Error - Example):**

```json
{
  "error": "Failed to create customer"
}
```


**2. Get All Customers (GET /api/getallcustomers)**

**Request:**

```
GET /api/getallcustomers
```

**Response (200 OK):**

```json
[
  {
    "_id": "654321...",
    "customerCode": "RK00001",
    "fullName": "John Doe",
    "fathersName": "Peter Doe",
    "address": "123 Main St",
    "contactNumber": "555-1234",
    "openingAccountBalance": 1000,
    "status": "active",
    "accountType": "Standard",
    "dateOfRegistration": "2024-10-26T14:32:11.123Z",
    "gender": "Male",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "createdAt": "2024-10-26T14:32:11.123Z",
    "updatedAt": "2024-10-26T14:32:11.123Z",
    "__v": 0
  },
  {
    "_id": "123456...",
    "customerCode": "RK00002",
    "fullName": "Jane Doe",
    "fathersName": "Robert Doe",
    "address": "456 Oak Ave",
    "contactNumber": "555-5678",
    "openingAccountBalance": 500,
    "gender": "Female",
    "dateOfBirth": "1985-10-20T00:00:00.000Z",
    "createdAt": "2024-10-26T14:33:44.789Z",
    "updatedAt": "2024-10-26T14:33:44.789Z",
    "__v": 0
  }
]
```

**Response (500 Internal Server Error):**

```json
{
  "error": "Failed to retrieve customers"
}
```


**3. Get Customer by ID (GET /api/getcustomersbyid/:id)**

**Request:**

```
GET /api/getcustomersbyid/654321...
```

**Response (200 OK):**  (Same structure as a single customer object from the `/getallcustomers` response)


**Response (404 Not Found):**

```json
{
  "error": "Customer not found"
}
```

**4. Get Customer by Code (GET /api/getcustomersbycode/:customerCode)**

**Request:**

```
GET /api/getcustomersbycode/RK00001
```

**Response (200 OK):** (Same structure as a single customer object from the `/getallcustomers` response)


**Response (404 Not Found):**

```json
{
  "error": "Customer not found"
}
```

**5. Update Customer (PUT /api/updatecustomer/:id)**

**Request:**

```json
PUT /api/updatecustomer/654321...
```

```json
{
  "address": "123 New St"
}
```

**Response (200 OK):** (Same structure as a single customer object from the `/getallcustomers` response, reflecting the changes)


**Response (404 Not Found):**

```json
{
  "error": "Customer not found"
}
```

**6. Delete Customer (DELETE /api/deletecustomer/:id)**

**Request:**

```
DELETE /api/deletecustomer/654321...
```

**Response (200 OK):**

```json
{
  "message": "Customer deleted successfully"
}
```

**Response (404 Not Found):**

```json
{
  "error": "Customer not found"
}
```

**7. Create Bulk Customers (POST /api/customers/bulk)**

**Request:**

```json
{
  "customers": [
    {
      "fullName": "Bulk Customer 1",
      "fathersName": "BC1 Father",
      "address": "BC1 Address",
      "contactNumber": "111-2222",
      "openingAccountBalance": 100,
      "gender": "Male",
      "dateOfBirth": "2000-01-01"
    },
    {
      "fullName": "Bulk Customer 2",
      "fathersName": "BC2 Father",
      "address": "BC2 Address",
      "contactNumber": "333-4444",
      "openingAccountBalance": 200,
      "gender": "Female",
      "dateOfBirth": "1975-05-10"
    }
  ]
}
```

**Response (201 Created):**

```json
{
  "message": "2 customers added successfully",
  "addedCustomers": [
    { /* Customer object 1 */ },
    { /* Customer object 2 */ }
  ],
  "failedCustomers": []
}
```

**Response (201 Created with Failures):**

```json
{
  "message": "1 customers added successfully",
  "addedCustomers": [
    { /* Customer object 1 */ }
  ],
  "failedCustomers": [
    { "customer": { /* Customer data that failed */ }, "error": "Error message" }
  ]
}
```

**Response (500 Internal Server Error):**

```json
{
  "error": "Failed to create bulk customers"
}
```
