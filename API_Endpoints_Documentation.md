# WowRol App API Endpoints Documentation
## PHP to Node.js Express Conversion Guide

This document outlines all API endpoints from the legacy PHP project that need to be converted to Node.js Express.

---

## Table of Contents
1. [Authentication & User Management](#authentication--user-management)
2. [Store Management](#store-management)
3. [Product Management](#product-management)
4. [Social Features](#social-features)
5. [Check-in & Shopping](#check-in--shopping)
6. [Settings & Profile](#settings--profile)
7. [Location Management](#location-management)
8. [Analytics & Advertisement](#analytics--advertisement)
9. [File Upload](#file-upload)

---

## Authentication & User Management

### 1. User Signup
- **PHP Form**: `Signup`
- **Method**: POST
- **Arguments**:
  - `email_or_phone` (string, required)
  - `password` (string, required)
  - `confirm_password` (string, required)
- **Node.js Route**: `POST /api/auth/signup`

### 2. User Login
- **PHP Form**: `login_form`
- **Method**: POST
- **Arguments**:
  - `login_email_or_phone` (string, required)
  - `login_password` (string, required)
  - `remember_me` (string, default: 'off')
- **Node.js Route**: `POST /api/auth/login`

### 3. Store Staff Login
- **PHP Form**: `storestafflogin`
- **Method**: POST
- **Arguments**:
  - `store_url_address` (string, required)
  - `storestaffhash` (string, required)
  - `username` (string, required)
  - `password` (string, required)
  - `remember_me` (string, default: 'off')
- **Node.js Route**: `POST /api/auth/store-staff-login`

### 4. Account Verification
- **PHP Form**: `AccountVerification`
- **Method**: POST
- **Arguments**:
  - `verification_code` (string, required)
- **Node.js Route**: `POST /api/auth/verify`

### 5. Resend Verification Code
- **PHP Form**: `Resend_verification_code`
- **Method**: POST
- **Arguments**: None
- **Node.js Route**: `POST /api/auth/resend-verification`

### 6. Forget Password Flow
- **PHP Form**: `forgetpasswordform0`, `forgetpasswordform1`, `forgetpasswordconfirmation`, `forgetpasswordform4`
- **Method**: POST
- **Arguments**:
  - `accountstr` (string, required)
  - `recaptcha` (string, required)
  - `login_identity_id` (number, required)
  - `code` (string, required)
  - `accesskey` (string, required)
  - `token` (string, required)
  - `password` (string, required)
- **Node.js Route**: `POST /api/auth/forgot-password`

---

## Store Management

### 7. Store Registration
- **PHP Form**: `Ragister_Store`
- **Method**: POST
- **Arguments**:
  - `store_name` (string, required)
  - `store_url_address` (string, required)
  - `storecategory` (array, required)
  - `address` (string, required)
  - `pincode` (number, required)
  - `phone` (number, required)
- **Node.js Route**: `POST /api/store/register`

### 8. Store Registration Step 1
- **PHP Form**: `Ragister_Store_Step_1`
- **Method**: POST
- **Arguments**:
  - `store_name` (string, required)
  - `store_url_address` (string, required)
- **Node.js Route**: `POST /api/store/register-step1`

### 9. Store Settings
- **PHP Form**: `store_setting_0`, `store_setting_1`, `store_setting_456`, `store_setting_457`
- **Method**: POST
- **Arguments**:
  - `store_name` (string, required)
  - `website` (string)
  - `address` (string, required)
  - `landmark` (string)
  - `phone` (number, required)
  - `country` (number)
  - `state` (number)
  - `city` (number)
  - `town` (number)
  - `store_policy` (string, required)
  - `return_policy` (number, required)
  - `about_store` (string, required)
- **Node.js Route**: `POST /api/store/settings`

### 10. Store Collection Settings
- **PHP Form**: `setting_store_collection`
- **Method**: POST
- **Arguments**:
  - `collection_id` (array, required)
- **Node.js Route**: `POST /api/store/collection-settings`

### 11. Store Notification Settings
- **PHP Form**: `store_setting_3`
- **Method**: POST
- **Arguments**:
  - `ns0` (number, 0 or 1) - When store gets a new order (0=Off, 1=On)
  - `ns1` (number, 0 or 1) - When store product reaches out of stock (0=Off, 1=On)
  - `ns2` (number, 0 or 1) - When store product is about to expire next day (0=Off, 1=On)
  - `nss0` (number, 0 or 1) - Spread gets a quick reaction (0=Off, 1=On)
  - `nss1` (number, 0 or 1) - Spread gets a comment/review (0=Off, 1=On)
  - `nss2` (number, 0 or 1) - When store is tagged in a spread (0=Off, 1=On)
  - `nss3` (number, 0 or 1) - When store interacts with someone's spread (0=Off, 1=On)
- **Node.js Route**: `POST /api/store/notification-settings`

---

## Product Management

### 12. Add Product
- **PHP Form**: `product_one`
- **Method**: POST
- **Arguments**:
  - `product_name` (string, required)
  - `pid` (number, 0 for new)
  - `sid` (number)
  - `has_varient` (number)
  - `description` (string)
  - `keyfeature_0` to `keyfeature_3` (strings)
  - `varient_1` to `varient_3` (strings)
  - `searchword` (array)
  - `category` (array, required)
- **Node.js Route**: `POST /api/product/add`

### 13. Quick Add Product
- **PHP Form**: `QuickaddProduct`
- **Method**: POST
- **Arguments**:
  - `product_name` (string, required)
  - `description` (string)
  - `sell_price` (number, required)
  - `compare_price` (number, required)
  - `sku` (string, required)
  - `stock` (number, required)
  - `shippable` (number)
  - `shipping_method` (number)
  - `weight` (number)
  - `weightunit` (string)
  - `mainimages`, `webimages`, `featureimage` (arrays)
  - `category` (array, required)
- **Node.js Route**: `POST /api/product/quick-add`

### 14. Product Inventory
- **PHP Form**: `addprodctinventory`
- **Method**: POST
- **Arguments**:
  - `pid` (number, required) - Product ID
  - `vid` (number, required) - Variant ID
  - `act` (string, required: 'new', 'edit', 'delete') - Action to perform
  - `currency` (string, required) - Currency code (USD, EUR, etc.)
  - `unitsystem` (string, required) - Unit system (metric, imperial)
  - `sell_price` (number, required) - Selling price
  - `compare_price` (number, required) - Compare/original price
  - `sku` (string, required) - Stock Keeping Unit
  - `stock` (number, required) - Available stock quantity
  - `shippable` (number) - Whether product can be shipped (0=no, 1=yes)
  - `shipping_method` (number) - Shipping method ID
  - `weight` (number) - Product weight
  - `weightunit` (string) - Weight unit (kg, lbs, etc.)
  - `variant_0` to `variant_2` (strings) - Variant option values
  - `pvN` (array) - Product variant names
  - `Hvrt` (number) - Has variant flag (0=no, 1=yes)
  - `mainimages`, `webimages`, `featureimage` (arrays) - Product images
- **Node.js Route**: `POST /api/product/inventory`

### 15. Product Specifications
- **PHP Form**: `AddSpecifications`
- **Method**: POST
- **Arguments**:
  - `pid` (number, required)
  - `spf` (JSON object, required)
- **Node.js Route**: `POST /api/product/specifications`

### 16. Product Filters
- **PHP Form**: `AddFilter`
- **Method**: POST
- **Arguments**:
  - `pid` (number, required)
  - `fiatr` (JSON array, required)
- **Node.js Route**: `POST /api/product/filters`

---

## Social Features

### 17. Create Spread (Post)
- **PHP Form**: `spreadform`
- **Method**: POST
- **Arguments**:
  - `spread_text` (string, required)
  - `fromreaction` (number, required)
  - `spreadfromprivacy` (number, required)
  - `sid` (number, 0 for new)
  - `mainimages`, `webimages` (arrays)
  - `tagfriend` (array)
  - `promoteproduct` (array)
- **Node.js Route**: `POST /api/social/spread`

### 18. Add Comment
- **PHP Form**: `commentform:*`
- **Method**: POST
- **Arguments**:
  - `commenttext` (string, required)
  - `sid` (number, required)
  - `cid` (number, required)
  - `prpo` (string)
  - `ratingpoint` (number)
- **Node.js Route**: `POST /api/social/comment`

### 19. Delete Comment
- **PHP Form**: `commentdelete`
- **Method**: POST
- **Arguments**:
  - `action` (string, required: 'r' or 'd')
  - `sid` (number, required)
  - `cid` (number, required)
- **Node.js Route**: `POST /api/social/comment/delete`

### 20. Spread Reaction
- **PHP Form**: `spreadreaction`
- **Method**: POST
- **Arguments**:
  - `self` (number, required: 0 or 1)
  - `sid` (number, required)
- **Node.js Route**: `POST /api/social/spread/reaction`

### 21. Delete Spread
- **PHP Form**: `spreaddelete`
- **Method**: POST
- **Arguments**:
  - `sid` (number, required)
  - `action` (string, required: 'r' or 'd')
- **Node.js Route**: `POST /api/social/spread/delete`

### 22. Load Spread by ID
- **PHP Form**: `spreadloadbyID`
- **Method**: POST
- **Arguments**:
  - `sid` (number, required)
- **Node.js Route**: `POST /api/social/spread/load`

---

## Check-in & Shopping

### 23. Create Check-in
- **PHP Form**: `createcheckinbystore_id`
- **Method**: POST
- **Arguments**:
  - `store_id` (number, required)
- **Node.js Route**: `POST /api/checkin/create`

### 24. Load Store Browsing Data
- **PHP Form**: `loadSBdata`
- **Method**: POST
- **Arguments**:
  - `checkin_id` (number, required)
- **Node.js Route**: `POST /api/checkin/load-data`

### 25. Check-in Cart Edit
- **PHP Form**: `checkincartedit`
- **Method**: POST
- **Arguments**:
  - `checkin` (number, required)
  - `vid` (number, required)
  - `pid` (number, required)
  - `q` (number, required)
- **Node.js Route**: `POST /api/checkin/cart/edit`

### 26. Check-in Shortlist Edit
- **PHP Form**: `checkinshortListedit`
- **Method**: POST
- **Arguments**:
  - `checkin` (number, required)
  - `pid` (number, required)
  - `q` (number, required)
- **Node.js Route**: `POST /api/checkin/shortlist/edit`

### 27. Check-in Suggest Edit
- **PHP Form**: `checkinsuggestedit`
- **Method**: POST
- **Arguments**:
  - `checkin` (number, required)
  - `pid` (number, required)
  - `q` (number, required)
- **Node.js Route**: `POST /api/checkin/suggest/edit`

### 28. Register Shipping Order
- **PHP Form**: `RagisterShippingOrder`
- **Method**: POST
- **Arguments**:
  - `checkin` (number, required)
  - `addr_id` (number, required)
- **Node.js Route**: `POST /api/order/shipping`

---

## Settings & Profile

### 29. Buyer Settings
- **PHP Form**: `buyersetting_0`, `buyer_setting_568`, `buyersetting_2`, `buyersetting_3`, `buyersetting_5`
- **Method**: POST
- **Arguments**:
  - `first_name` (string, required) - Buyer's first name
  - `last_name` (string, required) - Buyer's last name
  - `sex` (number, required) - Gender (0=female, 1=male)
  - `birthday_Day` (number, required) - Day of birth (1-31)
  - `birthday_Month` (number, required) - Month of birth (1-12)
  - `birthday_Year` (number, required) - Year of birth
  - `country` (number, required) - Country ID from location database
  - `address` (string, required) - Primary address
  - `landmark` (string) - Nearby landmark for location reference
  - `phone` (number, required) - Primary phone number
  - `otheraddress` (string) - Secondary/alternative address
  - `otherlandmark` (string) - Secondary landmark
  - `otherphone` (string) - Secondary phone number
  - `pincode` (number, required) - Postal/ZIP code

**Buyer Notification Settings (buyersetting_3):**
  - `nss0` (number, 0 or 1) - Spread gets a quick reaction (0=Off, 1=On)
  - `nss1` (number, 0 or 1) - Spread gets a comment/review (0=Off, 1=On)
  - `nss2` (number, 0 or 1) - When you are tagged in a spread (0=Off, 1=On)
  - `nss3` (number, 0 or 1) - When you interact with someone's spread (0=Off, 1=On)

**Buyer Privacy Settings (buyersetting_5):**
  - `ip0`, `ip5`, `ip8`, `ip9`, `ip10` (numbers, 0,1,2,5) - Individual privacy settings
  - `cp0`, `cp1`, `cp5`, `cp6` (numbers, 0,1,2,5) - Company privacy settings
- **Node.js Route**: `POST /api/buyer/settings`

### 30. Company Settings
- **PHP Form**: `company_setting_0`
- **Method**: POST
- **Arguments**:
  - `company_name` (string, required) - Name of the company
  - `company_industry_category` (string, required) - Industry category the company belongs to
- **Node.js Route**: `POST /api/company/settings`

### 31. Profile Picture Settings
- **PHP Form**: `setting_profilepic`
- **Method**: POST
- **Arguments**:
  - `mainimages` (array) - Main profile images
  - `webimages` (array) - Web-optimized profile images
  - `featureimage` (array) - Featured/hero profile image
- **Node.js Route**: `POST /api/profile/picture`

### 32. Banner Settings
- **PHP Form**: `setting_banner`
- **Method**: POST
- **Arguments**:
  - `mainimages` (array) - Main banner images
  - `webimages` (array) - Web-optimized banner images
  - `featureimage` (array) - Featured/hero banner image
- **Node.js Route**: `POST /api/profile/banner`

### 33. Theme Settings
- **PHP Form**: `theme`
- **Method**: POST
- **Arguments**:
  - `theme` (array, required) - Theme configuration array (colors, fonts, layout preferences)
- **Node.js Route**: `POST /api/profile/theme`

---

## Location Management

### 34. Add Location
- **PHP Form**: `addlocation`
- **Method**: POST
- **Arguments**:
  - `locationtype` (number, required: 0 or 1) - Location type (0=city, 1=town)
  - `town` (string, required) - Town name
  - `city` (string/number, required) - City name or city ID from database
  - `postalCode` (string, required) - Postal/ZIP code for the location
  - `state` (number, required) - State/Province ID from location database
  - `country` (number, required) - Country ID from location database
- **Node.js Route**: `POST /api/location/add`

### 35. Load Market Data
- **PHP Form**: `loadMdata`
- **Method**: POST
- **Arguments**:
  - `market_id` (number, required) - Market location ID to load data for
- **Node.js Route**: `POST /api/market/load`

---

## Analytics & Advertisement

### 36. Analytics
- **PHP Form**: `analytics`
- **Method**: POST
- **Arguments**:
  - `sr` (array: innerWidth, innerHeight) - Screen resolution dimensions
  - `wd` (string: session_id) - Session identifier for tracking
  - `eid` (number: entity_id) - Entity ID (user, store, etc.)
  - `ul` (string: language) - User's preferred language
  - `lid` (number: location_id) - Location ID for geographic analytics
  - `et` (number: entity_type) - Entity type (1=store, 2=buyer, etc.)
  - `slug` (string) - URL slug for page tracking
  - `AppId` (string) - Application identifier
  - `t` (string: title) - Page title for content tracking
  - `u` (string: url) - Current page URL
  - `beg` (number: buyer_entity_gender) - Buyer gender for demographic analytics
  - `bea` (number: buyer_entity_age) - Buyer age for demographic analytics
- **Node.js Route**: `POST /api/analytics`

### 37. Advertisement Basic
- **PHP Form**: `advertisebasic`
- **Method**: POST
- **Arguments**:
  - `heading_1` (string, required) - Primary advertisement headline
  - `heading_2` (string, required) - Secondary advertisement headline
  - `description` (string, required) - Advertisement description text
  - `url` (string, required) - Landing page URL for the advertisement
  - `ct` (number, required: 0, 1, or 2) - Call-to-action type (0=learn more, 1=shop now, 2=sign up)
  - `adid` (number, 0 for new) - Advertisement ID (0 for new ad, existing ID for edit)
- **Node.js Route**: `POST /api/advertisement/basic`

### 38. Advertisement Location Edit
- **PHP Form**: `advertiselocationedit`
- **Method**: POST
- **Arguments**:
  - `l` (JSON array: location_data) - Location targeting data for advertisement
  - `adid` (number, required) - Advertisement ID to edit location targeting for
- **Node.js Route**: `POST /api/advertisement/location`

---

## File Upload

### 39. Excel Upload
- **PHP Form**: `ExcelUpload`
- **Method**: POST
- **Arguments**:
  - `filename` (file, required: CSV format, max 1MB) - CSV file containing product data for bulk import
- **Node.js Route**: `POST /api/upload/excel`

---

## Utility Endpoints

### 40. Suggestion
- **PHP Form**: `suggestion`
- **Method**: POST
- **Arguments**:
  - `inputval` (string, required) - User input value for suggestions
  - `selected` (array) - Array of already selected items
  - `ifo` (JSON object) - Additional information for suggestion context
  - `suggest` (string, required) - Suggestion type or category
- **Node.js Route**: `POST /api/utility/suggestion`

### 41. Select Box
- **PHP Form**: `selectbox`
- **Method**: POST
- **Arguments**:
  - `sstr` (string, required) - Search string for filtering options
  - `selected` (array) - Array of already selected option IDs
  - `ifo` (JSON object) - Additional information for select box context
  - `suggest` (string, required) - Suggestion type or category for the select box
- **Node.js Route**: `POST /api/utility/selectbox`

### 42. Paging
- **PHP Form**: `paging`
- **Method**: POST
- **Arguments**:
  - `name` (string, required) - Paging context name/identifier
  - `sstr` (string: search_str) - Search string for filtering results
  - `slid` (number: selected_id) - Selected item ID
  - `ps` (number: pagesize) - Number of items per page
  - `tp` (number: totalpage) - Total number of pages
  - `pgd` (number: paged) - Current page number
  - `ifo` (JSON object: info) - Additional information for paging context
- **Node.js Route**: `POST /api/utility/paging`

---

## Decoded Cryptic Argument Names

Based on the code analysis, here are the meanings of the cryptic argument names used in the original PHP code:

### Common Abbreviations:
- **`pid`** = Product ID
- **`vid`** = Variant ID  
- **`sid`** = Spread ID (social post ID)
- **`cid`** = Comment ID or Category ID
- **`eid`** = Entity ID
- **`aid`** = Advertisement ID
- **`oid`** = Order ID

### Analytics Arguments:
- **`sr`** = Screen Resolution (array with innerWidth, innerHeight)
- **`wd`** = Session ID (from cookie 'wd' = visitId)
- **`eid`** = Entity ID
- **`ul`** = Language (from cookie 'wg' = lang)
- **`lid`** = Location ID
- **`et`** = Entity Type
- **`t`** = Title
- **`u`** = URL
- **`beg`** = Buyer Entity Gender
- **`bea`** = Buyer Entity Age

### Product Variant Arguments:
- **`pvN`** = Product Variant Names
- **`Hvrt`** = Has Variant flag
- **`pvV`** = Product Variant Values
- **`pvNVl`** = Product Variant Name-Value List

### Product Data Arguments:
- **`sP`** = Selling Price
- **`cP`** = Compare Price
- **`stk`** = Stock
- **`pN`** = Product Name
- **`bodrs`** = Backorders
- **`Issh`** = Is Shippable
- **`shMe`** = Shipping Method
- **`W`** = Weight
- **`Wu`** = Weight Unit

### Notification Settings:
- **`ns0`** = New order notification (0=Off, 1=On)
- **`ns1`** = Out of stock notification (0=Off, 1=On)
- **`ns2`** = Product expiry notification (0=Off, 1=On)
- **`nss0`** = Spread reaction notification (0=Off, 1=On)
- **`nss1`** = Spread comment/review notification (0=Off, 1=On)
- **`nss2`** = Tagged in spread notification (0=Off, 1=On)
- **`nss3`** = Spread interaction notification (0=Off, 1=On)
- **`ip0, ip5, ip8, ip9, ip10`** = Individual privacy settings (0,1,2,5)
- **`cp0, cp1, cp5, cp6`** = Company privacy settings (0,1,2,5)

### Other Common Arguments:
- **`act`** = Action (new, edit, delete)
- **`ifo`** = Information object
- **`sstr`** = Search string
- **`slid`** = Selected ID
- **`ps`** = Page size
- **`tp`** = Total pages
- **`pgd`** = Paged (current page)
- **`ct`** = Call-to-action type
- **`l`** = Location data
- **`fiatr`** = Filter attributes

---

## Node.js Express Implementation Notes

### 1. Middleware Requirements
- Authentication middleware for protected routes
- Input validation middleware
- File upload middleware (multer)
- CORS middleware
- Rate limiting middleware

### 2. Database Considerations
- Replace PHP MySQL queries with Node.js database ORM (Sequelize, Prisma, etc.)
- Implement connection pooling
- Use transactions for complex operations

### 3. Security Measures
- Implement JWT token authentication
- Use bcrypt for password hashing
- Input sanitization and validation
- CSRF protection
- Rate limiting

### 4. File Handling
- Use multer for file uploads
- Implement file size and type validation
- Secure file storage (AWS S3, local with proper permissions)

### 5. Error Handling
- Centralized error handling middleware
- Proper HTTP status codes
- Structured error responses
- Logging and monitoring

### 6. Response Format
```json
{
  "state": 200,
  "response": {},
  "mistake": {
    "heading": "",
    "message": []
  }
}
```

### 7. Environment Configuration
- Use environment variables for configuration
- Separate development, staging, and production configs
- Secure sensitive information

---

## Migration Checklist

- [ ] Set up Node.js Express project structure
- [ ] Install required dependencies
- [ ] Set up database connection and models
- [ ] Implement authentication system
- [ ] Create route handlers for each endpoint
- [ ] Implement input validation
- [ ] Set up file upload handling
- [ ] Implement error handling
- [ ] Add logging and monitoring
- [ ] Set up testing framework
- [ ] Implement security measures
- [ ] Performance optimization
- [ ] Documentation and API testing

---

*This documentation covers all 42 API endpoints identified in the ajax.php file. Each endpoint includes the original PHP form name, required arguments, and the corresponding Node.js Express route structure.*
