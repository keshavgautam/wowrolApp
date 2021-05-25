
<div class="block _bdy bg_0 fg_5 ff_3 bs-1">
   <pre> 

         --: PostalAddress:--

Property	  Expected Type     	Description

addressCountry	Text	The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
addressLocality	Text 	The locality. For example, Mountain View.
addressRegion	Text 	The region. For example, CA.
postOfficeBoxNumber	Text 	The post office box number for PO box addresses.
postalCode	Text 	The postal code. For example, 94043.
streetAddress	Text 	The street address. For example, 1600 Amphitheatre Pkwy.
======================================================================
  --: LocalBusiness :--
Property	  Expected Type     	Description
currenciesAccepted  Text 	The currency accepted (in ISO 4217 currency format).
openingHours   Text 	   The general opening hours for a business. Opening hours can be specified as a weekly time range, starting with days, then times per day.                                    Multiple  days can be listed with commas ',' separating each day. Day or time ranges are specified using a hyphen '-'.
paymentAccepted	Text 	Cash, credit card, etc.
priceRange	   Text 	The price range of the business, for example $$$.
======================================================================
  --:  Organization :--
aggregateRating	 AggregateRating 	The overall rating, based on a collection of reviews or ratings, of the item.
taxID	Text 	The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain.
areaServed  Text   The geographic area where a service or offered item is provided
email	Text 	Email address.
telephone	Text 	The telephone number.
sameAs	URL 	URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Freebase page, or official                          website.
======================================================================
</pre>
</div>
