# SQL Fast-Paced Course (PostgreSQL & rentaldvd)

Welcome to your fast-paced SQL course! We'll leverage your `rentaldvd` database, PostgreSQL, and pgAdmin to dive into practical SQL.

## 1. Review: SELECT, FROM, WHERE, ORDER BY

You know the basics. Let's quickly review and add some nuances.

**SELECT DISTINCT**: Get unique values.
*   **Example**: `SELECT DISTINCT rating FROM film;`
*   **Exercise**: Find all unique `rental_duration` values from the `film` table.
*   **Real World**: Listing unique product categories, customer regions.

**LIMIT & OFFSET**: Control result set size and starting point.
*   **Example**: `SELECT title, release_year FROM film ORDER BY title LIMIT 10 OFFSET 5;` (Skips first 5, shows next 10)
*   **Exercise**: Get the 3rd to 7th (inclusive) longest films by `length`, ordered descending.
*   **Real World**: Pagination in web applications, top N lists.

## 2. Filtering with WHERE - Advanced

**LIKE**: Pattern matching. Use `%` for any sequence, `_` for any single character.
*   **Example**: `SELECT first_name, last_name FROM actor WHERE first_name LIKE 'A%';`
*   **Exercise**: Find all films with 'LOVE' in their title.
*   **Real World**: Searching for names, product descriptions.

**IN**: Match any value in a list.
*   **Example**: `SELECT title FROM film WHERE rating IN ('PG', 'G');`
*   **Exercise**: Find all customers from `store_id` 1 or 2.
*   **Real World**: Filtering by multiple categories, statuses.

**BETWEEN**: Range checking (inclusive).
*   **Example**: `SELECT title, rental_rate FROM film WHERE rental_rate BETWEEN 0.99 AND 2.99;`
*   **Exercise**: Find all payments made between '2007-02-15' and '2007-02-20'.
*   **Real World**: Date ranges, price ranges.

**IS NULL / IS NOT NULL**: Check for missing values.
*   **Example**: `SELECT address2 FROM address WHERE address2 IS NOT NULL;`
*   **Exercise**: Find all customers who do not have a `picture` (assuming `picture` could be NULL in `customer` table, though it's usually not in `rentaldvd`).
*   **Real World**: Identifying incomplete data, optional fields.

## 3. Aggregation and Grouping (GROUP BY, HAVING)

**Aggregate Functions**: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
*   **Example**: `SELECT COUNT(*) FROM film;` `SELECT AVG(rental_rate) FROM film;`
*   **Real World**: Calculating totals, averages, counts for reports.

**GROUP BY**: Group rows that have the same values into a summary row.
*   **Example**: `SELECT rating, COUNT(*) FROM film GROUP BY rating;`
*   **Exercise**: Find the average `replacement_cost` for each `rating`.
*   **Real World**: Sales by region, average order value by customer segment.

**HAVING**: Filter groups based on aggregate conditions (like `WHERE` for `GROUP BY`).
*   **Example**: `SELECT rating, COUNT(*) FROM film GROUP BY rating HAVING COUNT(*) > 200;`
*   **Exercise**: Find `store_id`s where the total number of rentals is greater than 5000.
*   **Real World**: Identifying underperforming or overperforming groups.

## 4. Joining Tables

The `rentaldvd` database is relational, so joins are crucial.

**INNER JOIN**: Returns rows when there is a match in both tables.
*   **Example**: `SELECT f.title, l.name FROM film f INNER JOIN language l ON f.language_id = l.language_id;`
*   **Exercise**: List all films and their categories (use `film`, `film_category`, `category`).
*   **Real World**: Combining customer data with order data, product details with inventory.

**LEFT JOIN (LEFT OUTER JOIN)**: Returns all rows from the left table, and the matched rows from the right table. If no match, NULLs for right table columns.
*   **Example**: `SELECT c.first_name, c.last_name, p.amount FROM customer c LEFT JOIN payment p ON c.customer_id = p.customer_id WHERE p.payment_id IS NULL;` (Customers who made no payments)
*   **Exercise**: List all actors and any films they've acted in. Include actors who haven't acted in any film in the database (if any).
*   **Real World**: Finding customers without orders, products without reviews.

**RIGHT JOIN (RIGHT OUTER JOIN)**: Returns all rows from the right table, and the matched rows from the left table. (Less common, often rewritten as LEFT JOIN).
*   **Example**: `SELECT c.first_name, c.last_name, p.amount FROM payment p RIGHT JOIN customer c ON c.customer_id = p.customer_id;` (Same as LEFT JOIN with tables swapped)
*   **Real World**: Similar to LEFT JOIN, but from the perspective of the "right" entity.

**FULL JOIN (FULL OUTER JOIN)**: Returns all rows when there is a match in one of the tables. If no match, NULLs for the missing side.
*   **Example**: (Hard to demonstrate simply with `rentaldvd` without creating artificial data, but imagine joining two lists where some items might only exist in one list).
*   **Real World**: Comparing two lists of items, finding discrepancies.

**CROSS JOIN**: Returns the Cartesian product of the two tables (every row from table A combined with every row from table B).
*   **Example**: `SELECT a.first_name, f.title FROM actor a CROSS JOIN film f LIMIT 10;` (Usually used for specific scenarios, not general data retrieval).
*   **Real World**: Generating all possible combinations (e.g., all product variants).

## 5. Subqueries

A query nested inside another query. Can be used in `SELECT`, `FROM`, `WHERE`, `HAVING`.

**Subquery in WHERE (scalar or list)**:
*   **Example (scalar)**: `SELECT title FROM film WHERE rental_rate > (SELECT AVG(rental_rate) FROM film);`
*   **Example (list)**: `SELECT first_name, last_name FROM customer WHERE customer_id IN (SELECT customer_id FROM payment WHERE amount > 10);`
*   **Exercise**: Find all films that have a `length` greater than the maximum `length` of films with a 'PG' rating.
*   **Real World**: Filtering based on dynamic thresholds, finding items related to a specific set.

**Subquery in FROM (Derived Table)**:
*   **Example**: `SELECT AVG(rental_count) FROM (SELECT customer_id, COUNT(rental_id) AS rental_count FROM rental GROUP BY customer_id) AS customer_rentals;`
*   **Exercise**: Find the average number of films per category.
*   **Real World**: Pre-aggregating data before further analysis, simplifying complex joins.

## 6. Window Functions (Brief Introduction)

Perform calculations across a set of table rows that are related to the current row. They don't collapse rows like `GROUP BY`.

**ROW_NUMBER(), RANK(), DENSE_RANK()**: Assign a unique rank to each row within a partition.
*   **Example**: `SELECT payment_id, customer_id, amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rn FROM payment;`
*   **Exercise**: For each `store_id`, rank customers by their total payment amount.
*   **Real World**: Top N per group, leaderboards, identifying duplicates.

**LAG(), LEAD()**: Access data from a previous or next row in the same result set.
*   **Example**: `SELECT payment_id, customer_id, payment_date, LAG(payment_date, 1) OVER (PARTITION BY customer_id ORDER BY payment_date) AS previous_payment FROM payment;`
*   **Real World**: Calculating time differences between events, comparing current value to previous.

## 7. Data Modification (Briefly)

While the focus is querying, knowing how to change data is essential.

**INSERT**: Add new rows.
*   **Example**: `INSERT INTO language (name) VALUES ('Klingon');` (Note: `language_id` is likely auto-incrementing)
*   **Real World**: Adding new products, users, orders.

**UPDATE**: Modify existing rows.
*   **Example**: `UPDATE film SET rental_rate = 3.99 WHERE title = 'ACADEMY DINOSAUR';`
*   **Real World**: Changing product prices, updating user profiles.

**DELETE**: Remove rows.
*   **Example**: `DELETE FROM film WHERE title = 'ACADEMY DINOSAUR';` (Be careful with `DELETE`!)
*   **Real World**: Removing old data, inactive users.

---

This covers a lot of ground quickly. Practice these concepts in pgAdmin against your `rentaldvd` database. Experiment, break things (in a test environment!), and learn!
