# Tickets Routes

| Route            | Method | Body                             | Purpose                          |
| ---------------- | ------ | -------------------------------- | -------------------------------- | --- |
| /api/tickets     | GET    | -                                | Retrieve all tickets             |     |
| /api/tickets/:id | GET    | -                                | Retrieve ticket with spesific ID |     |
| /api/tickets     | POST   | { title: string, price: string } | Create a ticket                  |     |
| /api/tickets/:id | PUT    | { title: string, price: string } | Update a ticket                  |     |
