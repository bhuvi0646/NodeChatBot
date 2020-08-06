/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AxiosPromise } from 'axios';
import { Compute, JWT, OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { BodyResponseCallback, GlobalOptions, GoogleConfigurable, MethodOptions } from 'googleapis-common';
export declare namespace content_v2sandbox {
    interface Options extends GlobalOptions {
        version: 'v2sandbox';
    }
    /**
     * Content API for Shopping
     *
     * Manages product items, inventory, and Merchant Center accounts for Google
     * Shopping.
     *
     * @example
     * const {google} = require('googleapis');
     * const content = google.content('v2sandbox');
     *
     * @namespace content
     * @type {Function}
     * @version v2sandbox
     * @variation v2sandbox
     * @param {object=} options Options for Content
     */
    class Content {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        orderinvoices: Resource$Orderinvoices;
        orderpayments: Resource$Orderpayments;
        orderreturns: Resource$Orderreturns;
        orders: Resource$Orders;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    interface Schema$Amount {
        /**
         * [required] Value before taxes.
         */
        pretax?: Schema$Price;
        /**
         * [required] Tax value.
         */
        tax?: Schema$Price;
    }
    interface Schema$CustomerReturnReason {
        description?: string;
        reasonCode?: string;
    }
    /**
     * An error returned by the API.
     */
    interface Schema$Error {
        /**
         * The domain of the error.
         */
        domain?: string;
        /**
         * A description of the error.
         */
        message?: string;
        /**
         * The error code.
         */
        reason?: string;
    }
    /**
     * A list of errors returned by a failed batch entry.
     */
    interface Schema$Errors {
        /**
         * The HTTP status of the first error in errors.
         */
        code?: number;
        /**
         * A list of errors.
         */
        errors?: Schema$Error[];
        /**
         * The message of the first error in errors.
         */
        message?: string;
    }
    interface Schema$InvoiceSummary {
        /**
         * Summary of the total amounts of the additional charges.
         */
        additionalChargeSummaries?: Schema$InvoiceSummaryAdditionalChargeSummary[];
        /**
         * [required] Customer balance on this invoice. A negative amount means the
         * customer is paying, a positive one means the customer is receiving money.
         * Note: the sum of merchant_balance, customer_balance and google_balance
         * must always be zero.  Furthermore the absolute value of this amount is
         * expected to be equal to the sum of product amount and additional charges,
         * minus promotions.
         */
        customerBalance?: Schema$Amount;
        /**
         * [required] Google balance on this invoice. A negative amount means Google
         * is paying, a positive one means Google is receiving money. Note: the sum
         * of merchant_balance, customer_balance and google_balance must always be
         * zero.
         */
        googleBalance?: Schema$Amount;
        /**
         * [required] Merchant balance on this invoice. A negative amount means the
         * merchant is paying, a positive one means the merchant is receiving money.
         * Note: the sum of merchant_balance, customer_balance and google_balance
         * must always be zero.
         */
        merchantBalance?: Schema$Amount;
        /**
         * [required] Total price for the product.
         */
        productTotal?: Schema$Amount;
        /**
         * Summary for each promotion.
         */
        promotionSummaries?: Schema$Promotion[];
    }
    interface Schema$InvoiceSummaryAdditionalChargeSummary {
        /**
         * [required] Total additional charge for this type.
         */
        totalAmount?: Schema$Amount;
        /**
         * [required] Type of the additional charge.
         */
        type?: string;
    }
    interface Schema$MerchantOrderReturn {
        creationDate?: string;
        merchantOrderId?: string;
        orderId?: string;
        orderReturnId?: string;
        returnItems?: Schema$MerchantOrderReturnItem[];
        returnShipments?: Schema$ReturnShipment[];
    }
    interface Schema$MerchantOrderReturnItem {
        customerReturnReason?: Schema$CustomerReturnReason;
        itemId?: string;
        merchantReturnReason?: Schema$RefundReason;
        product?: Schema$OrderLineItemProduct;
        returnShipmentIds?: string[];
        state?: string;
    }
    interface Schema$Order {
        /**
         * Whether the order was acknowledged.
         */
        acknowledged?: boolean;
        /**
         * The channel type of the order: &quot;purchaseOnGoogle&quot; or
         * &quot;googleExpress&quot;.
         */
        channelType?: string;
        /**
         * The details of the customer who placed the order.
         */
        customer?: Schema$OrderCustomer;
        /**
         * The details for the delivery.
         */
        deliveryDetails?: Schema$OrderDeliveryDetails;
        /**
         * The REST id of the order. Globally unique.
         */
        id?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#order&quot;.
         */
        kind?: string;
        /**
         * Line items that are ordered.
         */
        lineItems?: Schema$OrderLineItem[];
        merchantId?: string;
        /**
         * Merchant-provided id of the order.
         */
        merchantOrderId?: string;
        /**
         * The net amount for the order. For example, if an order was originally for
         * a grand total of $100 and a refund was issued for $20, the net amount
         * will be $80.
         */
        netAmount?: Schema$Price;
        /**
         * The details of the payment method.
         */
        paymentMethod?: Schema$OrderPaymentMethod;
        /**
         * The status of the payment.
         */
        paymentStatus?: string;
        /**
         * The date when the order was placed, in ISO 8601 format.
         */
        placedDate?: string;
        /**
         * The details of the merchant provided promotions applied to the order.
         * More details about the program are here.
         */
        promotions?: Schema$OrderPromotion[];
        /**
         * Refunds for the order.
         */
        refunds?: Schema$OrderRefund[];
        /**
         * Shipments of the order.
         */
        shipments?: Schema$OrderShipment[];
        /**
         * The total cost of shipping for all items.
         */
        shippingCost?: Schema$Price;
        /**
         * The tax for the total shipping cost.
         */
        shippingCostTax?: Schema$Price;
        /**
         * The requested shipping option.
         */
        shippingOption?: string;
        /**
         * The status of the order.
         */
        status?: string;
    }
    interface Schema$OrderAddress {
        /**
         * CLDR country code (e.g. &quot;US&quot;).
         */
        country?: string;
        /**
         * Strings representing the lines of the printed label for mailing the
         * order, for example: John Smith 1600 Amphitheatre Parkway Mountain View,
         * CA, 94043 United States
         */
        fullAddress?: string[];
        /**
         * Whether the address is a post office box.
         */
        isPostOfficeBox?: boolean;
        /**
         * City, town or commune. May also include dependent localities or
         * sublocalities (e.g. neighborhoods or suburbs).
         */
        locality?: string;
        /**
         * Postal Code or ZIP (e.g. &quot;94043&quot;).
         */
        postalCode?: string;
        /**
         * Name of the recipient.
         */
        recipientName?: string;
        /**
         * Top-level administrative subdivision of the country. For example, a state
         * like California (&quot;CA&quot;) or a province like Quebec
         * (&quot;QC&quot;).
         */
        region?: string;
        /**
         * Street-level part of the address.
         */
        streetAddress?: string[];
    }
    interface Schema$OrderCancellation {
        /**
         * The actor that created the cancellation.
         */
        actor?: string;
        /**
         * Date on which the cancellation has been created, in ISO 8601 format.
         */
        creationDate?: string;
        /**
         * The quantity that was canceled.
         */
        quantity?: number;
        /**
         * The reason for the cancellation. Orders that are cancelled with a
         * noInventory reason will lead to the removal of the product from Shopping
         * Actions until you make an update to that product. This will not affect
         * your Shopping ads.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrderCustomer {
        /**
         * Deprecated.
         */
        email?: string;
        /**
         * Deprecated. Please use marketingRightsInfo instead.
         */
        explicitMarketingPreference?: boolean;
        /**
         * Full name of the customer.
         */
        fullName?: string;
        /**
         * Customer&#39;s marketing preferences.
         */
        marketingRightsInfo?: Schema$OrderCustomerMarketingRightsInfo;
    }
    interface Schema$OrderCustomerMarketingRightsInfo {
        /**
         * Last known user selection regarding marketing preferences. In certain
         * cases this selection might not be known, so this field would be empty.
         */
        explicitMarketingPreference?: string;
        /**
         * Timestamp when last time marketing preference was updated. Could be
         * empty, if user wasn&#39;t offered a selection yet.
         */
        lastUpdatedTimestamp?: string;
        /**
         * Email address that can be used for marketing purposes. This field is only
         * filled when explicitMarketingPreference is equal to &#39;granted&#39;.
         */
        marketingEmailAddress?: string;
    }
    interface Schema$OrderDeliveryDetails {
        /**
         * The delivery address
         */
        address?: Schema$OrderAddress;
        /**
         * The phone number of the person receiving the delivery.
         */
        phoneNumber?: string;
    }
    interface Schema$OrderinvoicesCreateChargeInvoiceRequest {
        /**
         * [required] The ID of the invoice.
         */
        invoiceId?: string;
        /**
         * [required] Invoice summary.
         */
        invoiceSummary?: Schema$InvoiceSummary;
        /**
         * [required] Invoice details per line item.
         */
        lineItemInvoices?: Schema$ShipmentInvoiceLineItemInvoice[];
        /**
         * [required] The ID of the operation, unique across all operations for a
         * given order.
         */
        operationId?: string;
        /**
         * [required] ID of the shipment group.
         */
        shipmentGroupId?: string;
    }
    interface Schema$OrderinvoicesCreateChargeInvoiceResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderinvoicesCreateChargeInvoiceResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderinvoicesCreateRefundInvoiceRequest {
        /**
         * [required] The ID of the invoice.
         */
        invoiceId?: string;
        /**
         * [required] The ID of the operation, unique across all operations for a
         * given order.
         */
        operationId?: string;
        /**
         * Option to create a refund-only invoice. Exactly one of refundOnlyOption
         * or returnOption must be provided.
         */
        refundOnlyOption?: Schema$OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceRefundOption;
        /**
         * Option to create an invoice for a refund and mark all items within the
         * invoice as returned. Exactly one of refundOnlyOption or returnOption must
         * be provided.
         */
        returnOption?: Schema$OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceReturnOption;
        /**
         * Invoice details for different shipment groups.
         */
        shipmentInvoices?: Schema$ShipmentInvoice[];
    }
    interface Schema$OrderinvoicesCreateRefundInvoiceResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderinvoicesCreateRefundInvoiceResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceRefundOption {
        /**
         * Optional description of the refund reason.
         */
        description?: string;
        /**
         * [required] Reason for the refund.
         */
        reason?: string;
    }
    interface Schema$OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceReturnOption {
        /**
         * Optional description of the return reason.
         */
        description?: string;
        /**
         * [required] Reason for the return.
         */
        reason?: string;
    }
    interface Schema$OrderLineItem {
        /**
         * Annotations that are attached to the line item.
         */
        annotations?: Schema$OrderMerchantProvidedAnnotation[];
        /**
         * Cancellations of the line item.
         */
        cancellations?: Schema$OrderCancellation[];
        /**
         * The id of the line item.
         */
        id?: string;
        /**
         * Total price for the line item. For example, if two items for $10 are
         * purchased, the total price will be $20.
         */
        price?: Schema$Price;
        /**
         * Product data from the time of the order placement.
         */
        product?: Schema$OrderLineItemProduct;
        /**
         * Number of items canceled.
         */
        quantityCanceled?: number;
        /**
         * Number of items delivered.
         */
        quantityDelivered?: number;
        /**
         * Number of items ordered.
         */
        quantityOrdered?: number;
        /**
         * Number of items pending.
         */
        quantityPending?: number;
        /**
         * Number of items returned.
         */
        quantityReturned?: number;
        /**
         * Number of items shipped.
         */
        quantityShipped?: number;
        /**
         * Details of the return policy for the line item.
         */
        returnInfo?: Schema$OrderLineItemReturnInfo;
        /**
         * Returns of the line item.
         */
        returns?: Schema$OrderReturn[];
        /**
         * Details of the requested shipping for the line item.
         */
        shippingDetails?: Schema$OrderLineItemShippingDetails;
        /**
         * Total tax amount for the line item. For example, if two items are
         * purchased, and each have a cost tax of $2, the total tax amount will be
         * $4.
         */
        tax?: Schema$Price;
    }
    interface Schema$OrderLineItemProduct {
        /**
         * Brand of the item.
         */
        brand?: string;
        /**
         * The item&#39;s channel (online or local).
         */
        channel?: string;
        /**
         * Condition or state of the item.
         */
        condition?: string;
        /**
         * The two-letter ISO 639-1 language code for the item.
         */
        contentLanguage?: string;
        /**
         * Global Trade Item Number (GTIN) of the item.
         */
        gtin?: string;
        /**
         * The REST id of the product.
         */
        id?: string;
        /**
         * URL of an image of the item.
         */
        imageLink?: string;
        /**
         * Shared identifier for all variants of the same product.
         */
        itemGroupId?: string;
        /**
         * Manufacturer Part Number (MPN) of the item.
         */
        mpn?: string;
        /**
         * An identifier of the item.
         */
        offerId?: string;
        /**
         * Price of the item.
         */
        price?: Schema$Price;
        /**
         * URL to the cached image shown to the user when order was placed.
         */
        shownImage?: string;
        /**
         * The CLDR territory code of the target country of the product.
         */
        targetCountry?: string;
        /**
         * The title of the product.
         */
        title?: string;
        /**
         * Variant attributes for the item. These are dimensions of the product,
         * such as color, gender, material, pattern, and size. You can find a
         * comprehensive list of variant attributes here.
         */
        variantAttributes?: Schema$OrderLineItemProductVariantAttribute[];
    }
    interface Schema$OrderLineItemProductVariantAttribute {
        /**
         * The dimension of the variant.
         */
        dimension?: string;
        /**
         * The value for the dimension.
         */
        value?: string;
    }
    interface Schema$OrderLineItemReturnInfo {
        /**
         * How many days later the item can be returned.
         */
        daysToReturn?: number;
        /**
         * Whether the item is returnable.
         */
        isReturnable?: boolean;
        /**
         * URL of the item return policy.
         */
        policyUrl?: string;
    }
    interface Schema$OrderLineItemShippingDetails {
        /**
         * The delivery by date, in ISO 8601 format.
         */
        deliverByDate?: string;
        /**
         * Details of the shipping method.
         */
        method?: Schema$OrderLineItemShippingDetailsMethod;
        /**
         * The ship by date, in ISO 8601 format.
         */
        shipByDate?: string;
    }
    interface Schema$OrderLineItemShippingDetailsMethod {
        /**
         * The carrier for the shipping. Optional. See shipments[].carrier for a
         * list of acceptable values.
         */
        carrier?: string;
        /**
         * Maximum transit time.
         */
        maxDaysInTransit?: number;
        /**
         * The name of the shipping method.
         */
        methodName?: string;
        /**
         * Minimum transit time.
         */
        minDaysInTransit?: number;
    }
    interface Schema$OrderMerchantProvidedAnnotation {
        /**
         * Key for additional merchant provided (as key-value pairs) annotation
         * about the line item.
         */
        key?: string;
        /**
         * Value for additional merchant provided (as key-value pairs) annotation
         * about the line item.
         */
        value?: string;
    }
    interface Schema$OrderPaymentMethod {
        /**
         * The billing address.
         */
        billingAddress?: Schema$OrderAddress;
        /**
         * The card expiration month (January = 1, February = 2 etc.).
         */
        expirationMonth?: number;
        /**
         * The card expiration year (4-digit, e.g. 2015).
         */
        expirationYear?: number;
        /**
         * The last four digits of the card number.
         */
        lastFourDigits?: string;
        /**
         * The billing phone number.
         */
        phoneNumber?: string;
        /**
         * The type of instrument.  Acceptable values are:   - &quot;AMEX&quot;  -
         * &quot;DISCOVER&quot;  - &quot;JCB&quot;  - &quot;MASTERCARD&quot;  -
         * &quot;UNIONPAY&quot;  - &quot;VISA&quot;  - &quot;&quot;
         */
        type?: string;
    }
    interface Schema$OrderpaymentsNotifyAuthApprovedRequest {
        authAmountPretax?: Schema$Price;
        authAmountTax?: Schema$Price;
    }
    interface Schema$OrderpaymentsNotifyAuthApprovedResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderpaymentsNotifyAuthApprovedResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderpaymentsNotifyAuthDeclinedRequest {
        /**
         * Reason why payment authorization was declined.
         */
        declineReason?: string;
    }
    interface Schema$OrderpaymentsNotifyAuthDeclinedResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderpaymentsNotifyAuthDeclinedResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderpaymentsNotifyChargeRequest {
        /**
         * Whether charge was successful.
         */
        chargeState?: string;
        /**
         * Deprecated. Please use invoiceIds instead.
         */
        invoiceId?: string;
        /**
         * Invoice IDs from the orderinvoices service that correspond to the charge.
         */
        invoiceIds?: string[];
    }
    interface Schema$OrderpaymentsNotifyChargeResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderpaymentsNotifyChargeResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderpaymentsNotifyRefundRequest {
        /**
         * Deprecated. Please use invoiceIds instead.
         */
        invoiceId?: string;
        /**
         * Invoice IDs from the orderinvoices service that correspond to the refund.
         */
        invoiceIds?: string[];
        /**
         * Whether refund was successful.
         */
        refundState?: string;
    }
    interface Schema$OrderpaymentsNotifyRefundResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderpaymentsNotifyRefundResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrderPromotion {
        benefits?: Schema$OrderPromotionBenefit[];
        /**
         * The date and time frame when the promotion is active and ready for
         * validation review. Note that the promotion live time may be delayed for a
         * few hours due to the validation review. Start date and end date are
         * separated by a forward slash (/). The start date is specified by the
         * format (YYYY-MM-DD), followed by the letter ?T?, the time of the day when
         * the sale starts (in Greenwich Mean Time, GMT), followed by an expression
         * of the time zone for the sale. The end date is in the same format.
         */
        effectiveDates?: string;
        /**
         * Optional. The text code that corresponds to the promotion when applied on
         * the retailer?s website.
         */
        genericRedemptionCode?: string;
        /**
         * The unique ID of the promotion.
         */
        id?: string;
        /**
         * The full title of the promotion.
         */
        longTitle?: string;
        /**
         * Whether the promotion is applicable to all products or only specific
         * products.
         */
        productApplicability?: string;
        /**
         * Indicates that the promotion is valid online.
         */
        redemptionChannel?: string;
    }
    interface Schema$OrderPromotionBenefit {
        /**
         * The discount in the order price when the promotion is applied.
         */
        discount?: Schema$Price;
        /**
         * The OfferId(s) that were purchased in this order and map to this specific
         * benefit of the promotion.
         */
        offerIds?: string[];
        /**
         * Further describes the benefit of the promotion. Note that we will expand
         * on this enumeration as we support new promotion sub-types.
         */
        subType?: string;
        /**
         * The impact on tax when the promotion is applied.
         */
        taxImpact?: Schema$Price;
        /**
         * Describes whether the promotion applies to products (e.g. 20% off) or to
         * shipping (e.g. Free Shipping).
         */
        type?: string;
    }
    interface Schema$OrderRefund {
        /**
         * The actor that created the refund.
         */
        actor?: string;
        /**
         * The amount that is refunded.
         */
        amount?: Schema$Price;
        /**
         * Date on which the item has been created, in ISO 8601 format.
         */
        creationDate?: string;
        /**
         * The reason for the refund.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrderReturn {
        /**
         * The actor that created the refund.
         */
        actor?: string;
        /**
         * Date on which the item has been created, in ISO 8601 format.
         */
        creationDate?: string;
        /**
         * Quantity that is returned.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrderreturnsListResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#orderreturnsListResponse&quot;.
         */
        kind?: string;
        /**
         * The token for the retrieval of the next page of returns.
         */
        nextPageToken?: string;
        resources?: Schema$MerchantOrderReturn[];
    }
    interface Schema$OrdersAcknowledgeRequest {
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
    }
    interface Schema$OrdersAcknowledgeResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersAcknowledgeResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersAdvanceTestOrderResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersAdvanceTestOrderResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersCancelLineItemRequest {
        /**
         * Deprecated. Please use amountPretax and amountTax instead.
         */
        amount?: Schema$Price;
        /**
         * Amount to refund for the cancelation. Optional. If not set, Google will
         * calculate the default based on the price and tax of the items involved.
         * The amount must not be larger than the net amount left on the order.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to cancellation amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to cancel. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to cancel. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to cancel.
         */
        quantity?: number;
        /**
         * The reason for the cancellation.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCancelLineItemResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCancelLineItemResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersCancelRequest {
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The reason for the cancellation.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCancelResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCancelResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersCancelTestOrderByCustomerRequest {
        /**
         * The reason for the cancellation.
         */
        reason?: string;
    }
    interface Schema$OrdersCancelTestOrderByCustomerResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCancelTestOrderByCustomerResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersCreateTestOrderRequest {
        /**
         * The  CLDR territory code of the country of the test order to create.
         * Affects the currency and addresses of orders created via template_name,
         * or the addresses of orders created via test_order.  Acceptable values
         * are:   - &quot;US&quot;  - &quot;FR&quot;  Defaults to US.
         */
        country?: string;
        /**
         * The test order template to use. Specify as an alternative to testOrder as
         * a shortcut for retrieving a template and then creating an order using
         * that template.
         */
        templateName?: string;
        /**
         * The test order to create.
         */
        testOrder?: Schema$TestOrder;
    }
    interface Schema$OrdersCreateTestOrderResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCreateTestOrderResponse&quot;.
         */
        kind?: string;
        /**
         * The ID of the newly created test order.
         */
        orderId?: string;
    }
    interface Schema$OrdersCreateTestReturnRequest {
        /**
         * Returned items.
         */
        items?: Schema$OrdersCustomBatchRequestEntryCreateTestReturnReturnItem[];
    }
    interface Schema$OrdersCreateTestReturnResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCreateTestReturnResponse&quot;.
         */
        kind?: string;
        /**
         * The ID of the newly created test order return.
         */
        returnId?: string;
    }
    interface Schema$OrdersCustomBatchRequest {
        /**
         * The request entries to be processed in the batch.
         */
        entries?: Schema$OrdersCustomBatchRequestEntry[];
    }
    interface Schema$OrdersCustomBatchRequestEntry {
        /**
         * An entry ID, unique within the batch request.
         */
        batchId?: number;
        /**
         * Required for cancel method.
         */
        cancel?: Schema$OrdersCustomBatchRequestEntryCancel;
        /**
         * Required for cancelLineItem method.
         */
        cancelLineItem?: Schema$OrdersCustomBatchRequestEntryCancelLineItem;
        /**
         * Required for inStoreReturnLineItem method.
         */
        inStoreRefundLineItem?: Schema$OrdersCustomBatchRequestEntryInStoreRefundLineItem;
        /**
         * The ID of the managing account.
         */
        merchantId?: string;
        /**
         * The merchant order id. Required for updateMerchantOrderId and
         * getByMerchantOrderId methods.
         */
        merchantOrderId?: string;
        /**
         * The method to apply.
         */
        method?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         * Required for all methods beside get and getByMerchantOrderId.
         */
        operationId?: string;
        /**
         * The ID of the order. Required for all methods beside
         * getByMerchantOrderId.
         */
        orderId?: string;
        /**
         * Required for refund method.
         */
        refund?: Schema$OrdersCustomBatchRequestEntryRefund;
        /**
         * Required for rejectReturnLineItem method.
         */
        rejectReturnLineItem?: Schema$OrdersCustomBatchRequestEntryRejectReturnLineItem;
        /**
         * Required for returnLineItem method.
         */
        returnLineItem?: Schema$OrdersCustomBatchRequestEntryReturnLineItem;
        /**
         * Required for returnRefundLineItem method.
         */
        returnRefundLineItem?: Schema$OrdersCustomBatchRequestEntryReturnRefundLineItem;
        /**
         * Required for setLineItemMetadata method.
         */
        setLineItemMetadata?: Schema$OrdersCustomBatchRequestEntrySetLineItemMetadata;
        /**
         * Required for shipLineItems method.
         */
        shipLineItems?: Schema$OrdersCustomBatchRequestEntryShipLineItems;
        /**
         * Required for updateLineItemShippingDate method.
         */
        updateLineItemShippingDetails?: Schema$OrdersCustomBatchRequestEntryUpdateLineItemShippingDetails;
        /**
         * Required for updateShipment method.
         */
        updateShipment?: Schema$OrdersCustomBatchRequestEntryUpdateShipment;
    }
    interface Schema$OrdersCustomBatchRequestEntryCancel {
        /**
         * The reason for the cancellation.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryCancelLineItem {
        /**
         * Deprecated. Please use amountPretax and amountTax instead.
         */
        amount?: Schema$Price;
        /**
         * Amount to refund for the cancelation. Optional. If not set, Google will
         * calculate the default based on the price and tax of the items involved.
         * The amount must not be larger than the net amount left on the order.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to cancellation amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to cancel. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to cancel. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to cancel.
         */
        quantity?: number;
        /**
         * The reason for the cancellation.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryCreateTestReturnReturnItem {
        /**
         * The ID of the line item to return.
         */
        lineItemId?: string;
        /**
         * Quantity that is returned.
         */
        quantity?: number;
    }
    interface Schema$OrdersCustomBatchRequestEntryInStoreRefundLineItem {
        /**
         * The amount that is refunded. Required.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax. Required.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryRefund {
        /**
         * Deprecated. Please use amountPretax and amountTax instead.
         */
        amount?: Schema$Price;
        /**
         * The amount that is refunded. Either amount or amountPretax and amountTax
         * should be filled.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The reason for the refund.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryRejectReturnLineItem {
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryReturnLineItem {
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryReturnRefundLineItem {
        /**
         * The amount that is refunded. If omitted, refundless return is assumed
         * (same as calling returnLineItem method). Optional, but if filled then
         * both amountPretax and amountTax must be set.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntrySetLineItemMetadata {
        annotations?: Schema$OrderMerchantProvidedAnnotation[];
        /**
         * The ID of the line item to set metadata. Either lineItemId or productId
         * is required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to set metadata. This is the REST ID used in the
         * products service. Either lineItemId or productId is required.
         */
        productId?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryShipLineItems {
        /**
         * Deprecated. Please use shipmentInfo instead. The carrier handling the
         * shipment. See shipments[].carrier in the  Orders resource representation
         * for a list of acceptable values.
         */
        carrier?: string;
        /**
         * Line items to ship.
         */
        lineItems?: Schema$OrderShipmentLineItemShipment[];
        /**
         * ID of the shipment group. Required for orders that use the orderinvoices
         * service.
         */
        shipmentGroupId?: string;
        /**
         * Deprecated. Please use shipmentInfo instead. The ID of the shipment.
         */
        shipmentId?: string;
        /**
         * Shipment information. This field is repeated because a single line item
         * can be shipped in several packages (and have several tracking IDs).
         */
        shipmentInfos?: Schema$OrdersCustomBatchRequestEntryShipLineItemsShipmentInfo[];
        /**
         * Deprecated. Please use shipmentInfo instead. The tracking id for the
         * shipment.
         */
        trackingId?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryShipLineItemsShipmentInfo {
        /**
         * The carrier handling the shipment. See shipments[].carrier in the  Orders
         * resource representation for a list of acceptable values.
         */
        carrier?: string;
        /**
         * The ID of the shipment.
         */
        shipmentId?: string;
        /**
         * The tracking id for the shipment.
         */
        trackingId?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryUpdateLineItemShippingDetails {
        /**
         * Updated delivery by date, in ISO 8601 format. If not specified only ship
         * by date is updated.
         */
        deliverByDate?: string;
        /**
         * The ID of the line item to set metadata. Either lineItemId or productId
         * is required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to set metadata. This is the REST ID used in the
         * products service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * Updated ship by date, in ISO 8601 format. If not specified only deliver
         * by date is updated.
         */
        shipByDate?: string;
    }
    interface Schema$OrdersCustomBatchRequestEntryUpdateShipment {
        /**
         * The carrier handling the shipment. Not updated if missing. See
         * shipments[].carrier in the  Orders resource representation for a list of
         * acceptable values.
         */
        carrier?: string;
        /**
         * Date on which the shipment has been delivered, in ISO 8601 format.
         * Optional and can be provided only if status is delivered.
         */
        deliveryDate?: string;
        /**
         * The ID of the shipment.
         */
        shipmentId?: string;
        /**
         * New status for the shipment. Not updated if missing.
         */
        status?: string;
        /**
         * The tracking id for the shipment. Not updated if missing.
         */
        trackingId?: string;
    }
    interface Schema$OrdersCustomBatchResponse {
        /**
         * The result of the execution of the batch requests.
         */
        entries?: Schema$OrdersCustomBatchResponseEntry[];
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCustomBatchResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersCustomBatchResponseEntry {
        /**
         * The ID of the request entry this entry responds to.
         */
        batchId?: number;
        /**
         * A list of errors defined if and only if the request failed.
         */
        errors?: Schema$Errors;
        /**
         * The status of the execution. Only defined if   - the request was
         * successful; and  - the method is not get, getByMerchantOrderId, or one of
         * the test methods.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersCustomBatchResponseEntry&quot;.
         */
        kind?: string;
        /**
         * The retrieved order. Only defined if the method is get and if the request
         * was successful.
         */
        order?: Schema$Order;
    }
    interface Schema$OrdersGetByMerchantOrderIdResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersGetByMerchantOrderIdResponse&quot;.
         */
        kind?: string;
        /**
         * The requested order.
         */
        order?: Schema$Order;
    }
    interface Schema$OrdersGetTestOrderTemplateResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersGetTestOrderTemplateResponse&quot;.
         */
        kind?: string;
        /**
         * The requested test order template.
         */
        template?: Schema$TestOrder;
    }
    interface Schema$OrderShipment {
        /**
         * The carrier handling the shipment.  Acceptable values are:   -
         * &quot;gsx&quot;  - &quot;ups&quot;  - &quot;usps&quot;  -
         * &quot;fedex&quot;  - &quot;dhl&quot;  - &quot;ecourier&quot;  -
         * &quot;cxt&quot;  - &quot;google&quot;  - &quot;ontrac&quot;  -
         * &quot;emsy&quot;  - &quot;ont&quot;  - &quot;deliv&quot;  -
         * &quot;dynamex&quot;  - &quot;lasership&quot;  - &quot;mpx&quot;  -
         * &quot;uds&quot;
         */
        carrier?: string;
        /**
         * Date on which the shipment has been created, in ISO 8601 format.
         */
        creationDate?: string;
        /**
         * Date on which the shipment has been delivered, in ISO 8601 format.
         * Present only if status is delivered
         */
        deliveryDate?: string;
        /**
         * The id of the shipment.
         */
        id?: string;
        /**
         * The line items that are shipped.
         */
        lineItems?: Schema$OrderShipmentLineItemShipment[];
        /**
         * The status of the shipment.
         */
        status?: string;
        /**
         * The tracking id for the shipment.
         */
        trackingId?: string;
    }
    interface Schema$OrderShipmentLineItemShipment {
        /**
         * The id of the line item that is shipped. Either lineItemId or productId
         * is required.
         */
        lineItemId?: string;
        /**
         * The ID of the product to ship. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity that is shipped.
         */
        quantity?: number;
    }
    interface Schema$OrdersInStoreRefundLineItemRequest {
        /**
         * The amount that is refunded. Required.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax. Required.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersInStoreRefundLineItemResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersInStoreRefundLineItemResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersListResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersListResponse&quot;.
         */
        kind?: string;
        /**
         * The token for the retrieval of the next page of orders.
         */
        nextPageToken?: string;
        resources?: Schema$Order[];
    }
    interface Schema$OrdersRefundRequest {
        /**
         * Deprecated. Please use amountPretax and amountTax instead.
         */
        amount?: Schema$Price;
        /**
         * The amount that is refunded. Either amount or amountPretax and amountTax
         * should be filled.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The reason for the refund.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersRefundResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersRefundResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersRejectReturnLineItemRequest {
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersRejectReturnLineItemResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersRejectReturnLineItemResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersReturnLineItemRequest {
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersReturnLineItemResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersReturnLineItemResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersReturnRefundLineItemRequest {
        /**
         * The amount that is refunded. If omitted, refundless return is assumed
         * (same as calling returnLineItem method). Optional, but if filled then
         * both amountPretax and amountTax must be set.
         */
        amountPretax?: Schema$Price;
        /**
         * Tax amount that correspond to refund amount in amountPretax.
         */
        amountTax?: Schema$Price;
        /**
         * The ID of the line item to return. Either lineItemId or productId is
         * required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to return. This is the REST ID used in the products
         * service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * The quantity to return and refund.
         */
        quantity?: number;
        /**
         * The reason for the return.
         */
        reason?: string;
        /**
         * The explanation of the reason.
         */
        reasonText?: string;
    }
    interface Schema$OrdersReturnRefundLineItemResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersReturnRefundLineItemResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersSetLineItemMetadataRequest {
        annotations?: Schema$OrderMerchantProvidedAnnotation[];
        /**
         * The ID of the line item to set metadata. Either lineItemId or productId
         * is required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to set metadata. This is the REST ID used in the
         * products service. Either lineItemId or productId is required.
         */
        productId?: string;
    }
    interface Schema$OrdersSetLineItemMetadataResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersSetLineItemMetadataResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersShipLineItemsRequest {
        /**
         * Deprecated. Please use shipmentInfo instead. The carrier handling the
         * shipment. See shipments[].carrier in the  Orders resource representation
         * for a list of acceptable values.
         */
        carrier?: string;
        /**
         * Line items to ship.
         */
        lineItems?: Schema$OrderShipmentLineItemShipment[];
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * ID of the shipment group. Required for orders that use the orderinvoices
         * service.
         */
        shipmentGroupId?: string;
        /**
         * Deprecated. Please use shipmentInfo instead. The ID of the shipment.
         */
        shipmentId?: string;
        /**
         * Shipment information. This field is repeated because a single line item
         * can be shipped in several packages (and have several tracking IDs).
         */
        shipmentInfos?: Schema$OrdersCustomBatchRequestEntryShipLineItemsShipmentInfo[];
        /**
         * Deprecated. Please use shipmentInfo instead. The tracking id for the
         * shipment.
         */
        trackingId?: string;
    }
    interface Schema$OrdersShipLineItemsResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersShipLineItemsResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersUpdateLineItemShippingDetailsRequest {
        /**
         * Updated delivery by date, in ISO 8601 format. If not specified only ship
         * by date is updated.
         */
        deliverByDate?: string;
        /**
         * The ID of the line item to set metadata. Either lineItemId or productId
         * is required.
         */
        lineItemId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the product to set metadata. This is the REST ID used in the
         * products service. Either lineItemId or productId is required.
         */
        productId?: string;
        /**
         * Updated ship by date, in ISO 8601 format. If not specified only deliver
         * by date is updated.
         */
        shipByDate?: string;
    }
    interface Schema$OrdersUpdateLineItemShippingDetailsResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersUpdateLineItemShippingDetailsResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersUpdateMerchantOrderIdRequest {
        /**
         * The merchant order id to be assigned to the order. Must be unique per
         * merchant.
         */
        merchantOrderId?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
    }
    interface Schema$OrdersUpdateMerchantOrderIdResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersUpdateMerchantOrderIdResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$OrdersUpdateShipmentRequest {
        /**
         * The carrier handling the shipment. Not updated if missing. See
         * shipments[].carrier in the  Orders resource representation for a list of
         * acceptable values.
         */
        carrier?: string;
        /**
         * Date on which the shipment has been delivered, in ISO 8601 format.
         * Optional and can be provided only if status is delivered.
         */
        deliveryDate?: string;
        /**
         * The ID of the operation. Unique across all operations for a given order.
         */
        operationId?: string;
        /**
         * The ID of the shipment.
         */
        shipmentId?: string;
        /**
         * New status for the shipment. Not updated if missing.
         */
        status?: string;
        /**
         * The tracking id for the shipment. Not updated if missing.
         */
        trackingId?: string;
    }
    interface Schema$OrdersUpdateShipmentResponse {
        /**
         * The status of the execution.
         */
        executionStatus?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#ordersUpdateShipmentResponse&quot;.
         */
        kind?: string;
    }
    interface Schema$Price {
        /**
         * The currency of the price.
         */
        currency?: string;
        /**
         * The price represented as a number.
         */
        value?: string;
    }
    interface Schema$Promotion {
        /**
         * [required] Amount of the promotion. The values here are the promotion
         * applied to the unit price pretax and to the total of the tax amounts.
         */
        promotionAmount?: Schema$Amount;
        /**
         * [required] ID of the promotion.
         */
        promotionId?: string;
    }
    interface Schema$RefundReason {
        description?: string;
        reasonCode?: string;
    }
    interface Schema$ReturnShipment {
        creationDate?: string;
        returnMethodType?: string;
        shipmentId?: string;
        shipmentTrackingInfos?: Schema$ShipmentTrackingInfo[];
    }
    interface Schema$ShipmentInvoice {
        /**
         * [required] Invoice summary.
         */
        invoiceSummary?: Schema$InvoiceSummary;
        /**
         * [required] Invoice details per line item.
         */
        lineItemInvoices?: Schema$ShipmentInvoiceLineItemInvoice[];
        /**
         * [required] ID of the shipment group.
         */
        shipmentGroupId?: string;
    }
    interface Schema$ShipmentInvoiceLineItemInvoice {
        /**
         * ID of the line item. Either lineItemId or productId must be set.
         */
        lineItemId?: string;
        /**
         * ID of the product. This is the REST ID used in the products service.
         * Either lineItemId or productId must be set.
         */
        productId?: string;
        /**
         * [required] Unit IDs to define specific units within the line item.
         */
        shipmentUnitIds?: string[];
        /**
         * [required] Invoice details for a single unit.
         */
        unitInvoice?: Schema$UnitInvoice;
    }
    interface Schema$ShipmentTrackingInfo {
        carrier?: string;
        trackingNumber?: string;
    }
    interface Schema$TestOrder {
        /**
         * The details of the customer who placed the order.
         */
        customer?: Schema$TestOrderCustomer;
        /**
         * Whether the orderinvoices service should support this order.
         */
        enableOrderinvoices?: boolean;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;content#testOrder&quot;.
         */
        kind?: string;
        /**
         * Line items that are ordered. At least one line item must be provided.
         */
        lineItems?: Schema$TestOrderLineItem[];
        /**
         * Determines if test order must be pulled by merchant or pushed to merchant
         * via push integration.
         */
        notificationMode?: string;
        /**
         * The details of the payment method.
         */
        paymentMethod?: Schema$TestOrderPaymentMethod;
        /**
         * Identifier of one of the predefined delivery addresses for the delivery.
         */
        predefinedDeliveryAddress?: string;
        /**
         * The details of the merchant provided promotions applied to the order.
         * More details about the program are here.
         */
        promotions?: Schema$OrderPromotion[];
        /**
         * The total cost of shipping for all items.
         */
        shippingCost?: Schema$Price;
        /**
         * The tax for the total shipping cost.
         */
        shippingCostTax?: Schema$Price;
        /**
         * The requested shipping option.
         */
        shippingOption?: string;
    }
    interface Schema$TestOrderCustomer {
        /**
         * Deprecated.
         */
        email?: string;
        /**
         * Deprecated. Please use marketingRightsInfo instead.
         */
        explicitMarketingPreference?: boolean;
        /**
         * Full name of the customer.
         */
        fullName?: string;
        /**
         * Customer&#39;s marketing preferences.
         */
        marketingRightsInfo?: Schema$TestOrderCustomerMarketingRightsInfo;
    }
    interface Schema$TestOrderCustomerMarketingRightsInfo {
        /**
         * Last know user use selection regards marketing preferences. In certain
         * cases selection might not be known, so this field would be empty.
         */
        explicitMarketingPreference?: string;
        /**
         * Timestamp when last time marketing preference was updated. Could be
         * empty, if user wasn&#39;t offered a selection yet.
         */
        lastUpdatedTimestamp?: string;
    }
    interface Schema$TestOrderLineItem {
        /**
         * Product data from the time of the order placement.
         */
        product?: Schema$TestOrderLineItemProduct;
        /**
         * Number of items ordered.
         */
        quantityOrdered?: number;
        /**
         * Details of the return policy for the line item.
         */
        returnInfo?: Schema$OrderLineItemReturnInfo;
        /**
         * Details of the requested shipping for the line item.
         */
        shippingDetails?: Schema$OrderLineItemShippingDetails;
        /**
         * Unit tax for the line item.
         */
        unitTax?: Schema$Price;
    }
    interface Schema$TestOrderLineItemProduct {
        /**
         * Brand of the item.
         */
        brand?: string;
        /**
         * The item&#39;s channel.
         */
        channel?: string;
        /**
         * Condition or state of the item.
         */
        condition?: string;
        /**
         * The two-letter ISO 639-1 language code for the item.
         */
        contentLanguage?: string;
        /**
         * Global Trade Item Number (GTIN) of the item. Optional.
         */
        gtin?: string;
        /**
         * URL of an image of the item.
         */
        imageLink?: string;
        /**
         * Shared identifier for all variants of the same product. Optional.
         */
        itemGroupId?: string;
        /**
         * Manufacturer Part Number (MPN) of the item. Optional.
         */
        mpn?: string;
        /**
         * An identifier of the item.
         */
        offerId?: string;
        /**
         * The price for the product.
         */
        price?: Schema$Price;
        /**
         * The CLDR territory code of the target country of the product.
         */
        targetCountry?: string;
        /**
         * The title of the product.
         */
        title?: string;
        /**
         * Variant attributes for the item. Optional.
         */
        variantAttributes?: Schema$OrderLineItemProductVariantAttribute[];
    }
    interface Schema$TestOrderPaymentMethod {
        /**
         * The card expiration month (January = 1, February = 2 etc.).
         */
        expirationMonth?: number;
        /**
         * The card expiration year (4-digit, e.g. 2015).
         */
        expirationYear?: number;
        /**
         * The last four digits of the card number.
         */
        lastFourDigits?: string;
        /**
         * The billing address.
         */
        predefinedBillingAddress?: string;
        /**
         * The type of instrument. Note that real orders might have different values
         * than the four values accepted by createTestOrder.
         */
        type?: string;
    }
    interface Schema$UnitInvoice {
        /**
         * Additional charges for a unit, e.g. shipping costs.
         */
        additionalCharges?: Schema$UnitInvoiceAdditionalCharge[];
        /**
         * Promotions applied to a unit.
         */
        promotions?: Schema$Promotion[];
        /**
         * [required] Price of the unit, before applying taxes.
         */
        unitPricePretax?: Schema$Price;
        /**
         * Tax amounts to apply to the unit price.
         */
        unitPriceTaxes?: Schema$UnitInvoiceTaxLine[];
    }
    interface Schema$UnitInvoiceAdditionalCharge {
        /**
         * [required] Amount of the additional charge.
         */
        additionalChargeAmount?: Schema$Amount;
        /**
         * Promotions applied to the additional charge.
         */
        additionalChargePromotions?: Schema$Promotion[];
        /**
         * [required] Type of the additional charge.
         */
        type?: string;
    }
    interface Schema$UnitInvoiceTaxLine {
        /**
         * [required] Tax amount for the tax type.
         */
        taxAmount?: Schema$Price;
        /**
         * Optional name of the tax type. This should only be provided if taxType is
         * otherFeeTax.
         */
        taxName?: string;
        /**
         * [required] Type of the tax.
         */
        taxType?: string;
    }
    class Resource$Orderinvoices {
        root: Content;
        constructor(root: Content);
        getRoot(): Content;
        /**
         * content.orderinvoices.createchargeinvoice
         * @desc Creates a charge invoice for a shipment group, and triggers a
         * charge capture for non-facilitated payment orders.
         * @alias content.orderinvoices.createchargeinvoice
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrderinvoicesCreateChargeInvoiceRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createchargeinvoice(params?: Params$Resource$Orderinvoices$Createchargeinvoice, options?: MethodOptions): AxiosPromise<Schema$OrderinvoicesCreateChargeInvoiceResponse>;
        createchargeinvoice(params: Params$Resource$Orderinvoices$Createchargeinvoice, options: MethodOptions | BodyResponseCallback<Schema$OrderinvoicesCreateChargeInvoiceResponse>, callback: BodyResponseCallback<Schema$OrderinvoicesCreateChargeInvoiceResponse>): void;
        createchargeinvoice(params: Params$Resource$Orderinvoices$Createchargeinvoice, callback: BodyResponseCallback<Schema$OrderinvoicesCreateChargeInvoiceResponse>): void;
        createchargeinvoice(callback: BodyResponseCallback<Schema$OrderinvoicesCreateChargeInvoiceResponse>): void;
        /**
         * content.orderinvoices.createrefundinvoice
         * @desc Creates a refund invoice for one or more shipment groups, and
         * triggers a refund for non-facilitated payment orders. This can only be
         * used for line items that have previously been charged using
         * createChargeInvoice. All amounts (except for the summary) are incremental
         * with respect to the previous invoice.
         * @alias content.orderinvoices.createrefundinvoice
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrderinvoicesCreateRefundInvoiceRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createrefundinvoice(params?: Params$Resource$Orderinvoices$Createrefundinvoice, options?: MethodOptions): AxiosPromise<Schema$OrderinvoicesCreateRefundInvoiceResponse>;
        createrefundinvoice(params: Params$Resource$Orderinvoices$Createrefundinvoice, options: MethodOptions | BodyResponseCallback<Schema$OrderinvoicesCreateRefundInvoiceResponse>, callback: BodyResponseCallback<Schema$OrderinvoicesCreateRefundInvoiceResponse>): void;
        createrefundinvoice(params: Params$Resource$Orderinvoices$Createrefundinvoice, callback: BodyResponseCallback<Schema$OrderinvoicesCreateRefundInvoiceResponse>): void;
        createrefundinvoice(callback: BodyResponseCallback<Schema$OrderinvoicesCreateRefundInvoiceResponse>): void;
    }
    interface Params$Resource$Orderinvoices$Createchargeinvoice {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderinvoicesCreateChargeInvoiceRequest;
    }
    interface Params$Resource$Orderinvoices$Createrefundinvoice {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderinvoicesCreateRefundInvoiceRequest;
    }
    class Resource$Orderpayments {
        root: Content;
        constructor(root: Content);
        getRoot(): Content;
        /**
         * content.orderpayments.notifyauthapproved
         * @desc Notify about successfully authorizing user's payment method for a
         * given amount.
         * @alias content.orderpayments.notifyauthapproved
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order for for which payment authorization is happening.
         * @param {().OrderpaymentsNotifyAuthApprovedRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        notifyauthapproved(params?: Params$Resource$Orderpayments$Notifyauthapproved, options?: MethodOptions): AxiosPromise<Schema$OrderpaymentsNotifyAuthApprovedResponse>;
        notifyauthapproved(params: Params$Resource$Orderpayments$Notifyauthapproved, options: MethodOptions | BodyResponseCallback<Schema$OrderpaymentsNotifyAuthApprovedResponse>, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthApprovedResponse>): void;
        notifyauthapproved(params: Params$Resource$Orderpayments$Notifyauthapproved, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthApprovedResponse>): void;
        notifyauthapproved(callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthApprovedResponse>): void;
        /**
         * content.orderpayments.notifyauthdeclined
         * @desc Notify about failure to authorize user's payment method.
         * @alias content.orderpayments.notifyauthdeclined
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order for which payment authorization was declined.
         * @param {().OrderpaymentsNotifyAuthDeclinedRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        notifyauthdeclined(params?: Params$Resource$Orderpayments$Notifyauthdeclined, options?: MethodOptions): AxiosPromise<Schema$OrderpaymentsNotifyAuthDeclinedResponse>;
        notifyauthdeclined(params: Params$Resource$Orderpayments$Notifyauthdeclined, options: MethodOptions | BodyResponseCallback<Schema$OrderpaymentsNotifyAuthDeclinedResponse>, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthDeclinedResponse>): void;
        notifyauthdeclined(params: Params$Resource$Orderpayments$Notifyauthdeclined, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthDeclinedResponse>): void;
        notifyauthdeclined(callback: BodyResponseCallback<Schema$OrderpaymentsNotifyAuthDeclinedResponse>): void;
        /**
         * content.orderpayments.notifycharge
         * @desc Notify about charge on user's selected payments method.
         * @alias content.orderpayments.notifycharge
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order for which charge is happening.
         * @param {().OrderpaymentsNotifyChargeRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        notifycharge(params?: Params$Resource$Orderpayments$Notifycharge, options?: MethodOptions): AxiosPromise<Schema$OrderpaymentsNotifyChargeResponse>;
        notifycharge(params: Params$Resource$Orderpayments$Notifycharge, options: MethodOptions | BodyResponseCallback<Schema$OrderpaymentsNotifyChargeResponse>, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyChargeResponse>): void;
        notifycharge(params: Params$Resource$Orderpayments$Notifycharge, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyChargeResponse>): void;
        notifycharge(callback: BodyResponseCallback<Schema$OrderpaymentsNotifyChargeResponse>): void;
        /**
         * content.orderpayments.notifyrefund
         * @desc Notify about refund on user's selected payments method.
         * @alias content.orderpayments.notifyrefund
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order for which charge is happening.
         * @param {().OrderpaymentsNotifyRefundRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        notifyrefund(params?: Params$Resource$Orderpayments$Notifyrefund, options?: MethodOptions): AxiosPromise<Schema$OrderpaymentsNotifyRefundResponse>;
        notifyrefund(params: Params$Resource$Orderpayments$Notifyrefund, options: MethodOptions | BodyResponseCallback<Schema$OrderpaymentsNotifyRefundResponse>, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyRefundResponse>): void;
        notifyrefund(params: Params$Resource$Orderpayments$Notifyrefund, callback: BodyResponseCallback<Schema$OrderpaymentsNotifyRefundResponse>): void;
        notifyrefund(callback: BodyResponseCallback<Schema$OrderpaymentsNotifyRefundResponse>): void;
    }
    interface Params$Resource$Orderpayments$Notifyauthapproved {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order for for which payment authorization is happening.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderpaymentsNotifyAuthApprovedRequest;
    }
    interface Params$Resource$Orderpayments$Notifyauthdeclined {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order for which payment authorization was declined.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderpaymentsNotifyAuthDeclinedRequest;
    }
    interface Params$Resource$Orderpayments$Notifycharge {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order for which charge is happening.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderpaymentsNotifyChargeRequest;
    }
    interface Params$Resource$Orderpayments$Notifyrefund {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order for which charge is happening.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrderpaymentsNotifyRefundRequest;
    }
    class Resource$Orderreturns {
        root: Content;
        constructor(root: Content);
        getRoot(): Content;
        /**
         * content.orderreturns.get
         * @desc Retrieves an order return from your Merchant Center account.
         * @alias content.orderreturns.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.returnId Merchant order return ID generated by Google.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Orderreturns$Get, options?: MethodOptions): AxiosPromise<Schema$MerchantOrderReturn>;
        get(params: Params$Resource$Orderreturns$Get, options: MethodOptions | BodyResponseCallback<Schema$MerchantOrderReturn>, callback: BodyResponseCallback<Schema$MerchantOrderReturn>): void;
        get(params: Params$Resource$Orderreturns$Get, callback: BodyResponseCallback<Schema$MerchantOrderReturn>): void;
        get(callback: BodyResponseCallback<Schema$MerchantOrderReturn>): void;
        /**
         * content.orderreturns.list
         * @desc Lists order returns in your Merchant Center account.
         * @alias content.orderreturns.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.createdEndDate Obtains order returns created before this date (inclusively), in ISO 8601 format.
         * @param {string=} params.createdStartDate Obtains order returns created after this date (inclusively), in ISO 8601 format.
         * @param {integer=} params.maxResults The maximum number of order returns to return in the response, used for paging. The default value is 25 returns per page, and the maximum allowed value is 250 returns per page.
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string=} params.orderBy Return the results in the specified order.
         * @param {string=} params.pageToken The token returned by the previous request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Orderreturns$List, options?: MethodOptions): AxiosPromise<Schema$OrderreturnsListResponse>;
        list(params: Params$Resource$Orderreturns$List, options: MethodOptions | BodyResponseCallback<Schema$OrderreturnsListResponse>, callback: BodyResponseCallback<Schema$OrderreturnsListResponse>): void;
        list(params: Params$Resource$Orderreturns$List, callback: BodyResponseCallback<Schema$OrderreturnsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$OrderreturnsListResponse>): void;
    }
    interface Params$Resource$Orderreturns$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * Merchant order return ID generated by Google.
         */
        returnId?: string;
    }
    interface Params$Resource$Orderreturns$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Obtains order returns created before this date (inclusively), in ISO 8601
         * format.
         */
        createdEndDate?: string;
        /**
         * Obtains order returns created after this date (inclusively), in ISO 8601
         * format.
         */
        createdStartDate?: string;
        /**
         * The maximum number of order returns to return in the response, used for
         * paging. The default value is 25 returns per page, and the maximum allowed
         * value is 250 returns per page.
         */
        maxResults?: number;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * Return the results in the specified order.
         */
        orderBy?: string;
        /**
         * The token returned by the previous request.
         */
        pageToken?: string;
    }
    class Resource$Orders {
        root: Content;
        constructor(root: Content);
        getRoot(): Content;
        /**
         * content.orders.acknowledge
         * @desc Marks an order as acknowledged.
         * @alias content.orders.acknowledge
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersAcknowledgeRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        acknowledge(params?: Params$Resource$Orders$Acknowledge, options?: MethodOptions): AxiosPromise<Schema$OrdersAcknowledgeResponse>;
        acknowledge(params: Params$Resource$Orders$Acknowledge, options: MethodOptions | BodyResponseCallback<Schema$OrdersAcknowledgeResponse>, callback: BodyResponseCallback<Schema$OrdersAcknowledgeResponse>): void;
        acknowledge(params: Params$Resource$Orders$Acknowledge, callback: BodyResponseCallback<Schema$OrdersAcknowledgeResponse>): void;
        acknowledge(callback: BodyResponseCallback<Schema$OrdersAcknowledgeResponse>): void;
        /**
         * content.orders.advancetestorder
         * @desc Sandbox only. Moves a test order from state "inProgress" to state
         * "pendingShipment".
         * @alias content.orders.advancetestorder
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the test order to modify.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        advancetestorder(params?: Params$Resource$Orders$Advancetestorder, options?: MethodOptions): AxiosPromise<Schema$OrdersAdvanceTestOrderResponse>;
        advancetestorder(params: Params$Resource$Orders$Advancetestorder, options: MethodOptions | BodyResponseCallback<Schema$OrdersAdvanceTestOrderResponse>, callback: BodyResponseCallback<Schema$OrdersAdvanceTestOrderResponse>): void;
        advancetestorder(params: Params$Resource$Orders$Advancetestorder, callback: BodyResponseCallback<Schema$OrdersAdvanceTestOrderResponse>): void;
        advancetestorder(callback: BodyResponseCallback<Schema$OrdersAdvanceTestOrderResponse>): void;
        /**
         * content.orders.cancel
         * @desc Cancels all line items in an order, making a full refund.
         * @alias content.orders.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order to cancel.
         * @param {().OrdersCancelRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params?: Params$Resource$Orders$Cancel, options?: MethodOptions): AxiosPromise<Schema$OrdersCancelResponse>;
        cancel(params: Params$Resource$Orders$Cancel, options: MethodOptions | BodyResponseCallback<Schema$OrdersCancelResponse>, callback: BodyResponseCallback<Schema$OrdersCancelResponse>): void;
        cancel(params: Params$Resource$Orders$Cancel, callback: BodyResponseCallback<Schema$OrdersCancelResponse>): void;
        cancel(callback: BodyResponseCallback<Schema$OrdersCancelResponse>): void;
        /**
         * content.orders.cancellineitem
         * @desc Cancels a line item, making a full refund.
         * @alias content.orders.cancellineitem
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersCancelLineItemRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancellineitem(params?: Params$Resource$Orders$Cancellineitem, options?: MethodOptions): AxiosPromise<Schema$OrdersCancelLineItemResponse>;
        cancellineitem(params: Params$Resource$Orders$Cancellineitem, options: MethodOptions | BodyResponseCallback<Schema$OrdersCancelLineItemResponse>, callback: BodyResponseCallback<Schema$OrdersCancelLineItemResponse>): void;
        cancellineitem(params: Params$Resource$Orders$Cancellineitem, callback: BodyResponseCallback<Schema$OrdersCancelLineItemResponse>): void;
        cancellineitem(callback: BodyResponseCallback<Schema$OrdersCancelLineItemResponse>): void;
        /**
         * content.orders.canceltestorderbycustomer
         * @desc Sandbox only. Cancels a test order for customer-initiated
         * cancellation.
         * @alias content.orders.canceltestorderbycustomer
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the test order to cancel.
         * @param {().OrdersCancelTestOrderByCustomerRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        canceltestorderbycustomer(params?: Params$Resource$Orders$Canceltestorderbycustomer, options?: MethodOptions): AxiosPromise<Schema$OrdersCancelTestOrderByCustomerResponse>;
        canceltestorderbycustomer(params: Params$Resource$Orders$Canceltestorderbycustomer, options: MethodOptions | BodyResponseCallback<Schema$OrdersCancelTestOrderByCustomerResponse>, callback: BodyResponseCallback<Schema$OrdersCancelTestOrderByCustomerResponse>): void;
        canceltestorderbycustomer(params: Params$Resource$Orders$Canceltestorderbycustomer, callback: BodyResponseCallback<Schema$OrdersCancelTestOrderByCustomerResponse>): void;
        canceltestorderbycustomer(callback: BodyResponseCallback<Schema$OrdersCancelTestOrderByCustomerResponse>): void;
        /**
         * content.orders.createtestorder
         * @desc Sandbox only. Creates a test order.
         * @alias content.orders.createtestorder
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that should manage the order. This cannot be a multi-client account.
         * @param {().OrdersCreateTestOrderRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createtestorder(params?: Params$Resource$Orders$Createtestorder, options?: MethodOptions): AxiosPromise<Schema$OrdersCreateTestOrderResponse>;
        createtestorder(params: Params$Resource$Orders$Createtestorder, options: MethodOptions | BodyResponseCallback<Schema$OrdersCreateTestOrderResponse>, callback: BodyResponseCallback<Schema$OrdersCreateTestOrderResponse>): void;
        createtestorder(params: Params$Resource$Orders$Createtestorder, callback: BodyResponseCallback<Schema$OrdersCreateTestOrderResponse>): void;
        createtestorder(callback: BodyResponseCallback<Schema$OrdersCreateTestOrderResponse>): void;
        /**
         * content.orders.createtestreturn
         * @desc Sandbox only. Creates a test return.
         * @alias content.orders.createtestreturn
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersCreateTestReturnRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createtestreturn(params?: Params$Resource$Orders$Createtestreturn, options?: MethodOptions): AxiosPromise<Schema$OrdersCreateTestReturnResponse>;
        createtestreturn(params: Params$Resource$Orders$Createtestreturn, options: MethodOptions | BodyResponseCallback<Schema$OrdersCreateTestReturnResponse>, callback: BodyResponseCallback<Schema$OrdersCreateTestReturnResponse>): void;
        createtestreturn(params: Params$Resource$Orders$Createtestreturn, callback: BodyResponseCallback<Schema$OrdersCreateTestReturnResponse>): void;
        createtestreturn(callback: BodyResponseCallback<Schema$OrdersCreateTestReturnResponse>): void;
        /**
         * content.orders.custombatch
         * @desc Retrieves or modifies multiple orders in a single request.
         * @alias content.orders.custombatch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().OrdersCustomBatchRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        custombatch(params?: Params$Resource$Orders$Custombatch, options?: MethodOptions): AxiosPromise<Schema$OrdersCustomBatchResponse>;
        custombatch(params: Params$Resource$Orders$Custombatch, options: MethodOptions | BodyResponseCallback<Schema$OrdersCustomBatchResponse>, callback: BodyResponseCallback<Schema$OrdersCustomBatchResponse>): void;
        custombatch(params: Params$Resource$Orders$Custombatch, callback: BodyResponseCallback<Schema$OrdersCustomBatchResponse>): void;
        custombatch(callback: BodyResponseCallback<Schema$OrdersCustomBatchResponse>): void;
        /**
         * content.orders.get
         * @desc Retrieves an order from your Merchant Center account.
         * @alias content.orders.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Orders$Get, options?: MethodOptions): AxiosPromise<Schema$Order>;
        get(params: Params$Resource$Orders$Get, options: MethodOptions | BodyResponseCallback<Schema$Order>, callback: BodyResponseCallback<Schema$Order>): void;
        get(params: Params$Resource$Orders$Get, callback: BodyResponseCallback<Schema$Order>): void;
        get(callback: BodyResponseCallback<Schema$Order>): void;
        /**
         * content.orders.getbymerchantorderid
         * @desc Retrieves an order using merchant order id.
         * @alias content.orders.getbymerchantorderid
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.merchantOrderId The merchant order id to be looked for.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getbymerchantorderid(params?: Params$Resource$Orders$Getbymerchantorderid, options?: MethodOptions): AxiosPromise<Schema$OrdersGetByMerchantOrderIdResponse>;
        getbymerchantorderid(params: Params$Resource$Orders$Getbymerchantorderid, options: MethodOptions | BodyResponseCallback<Schema$OrdersGetByMerchantOrderIdResponse>, callback: BodyResponseCallback<Schema$OrdersGetByMerchantOrderIdResponse>): void;
        getbymerchantorderid(params: Params$Resource$Orders$Getbymerchantorderid, callback: BodyResponseCallback<Schema$OrdersGetByMerchantOrderIdResponse>): void;
        getbymerchantorderid(callback: BodyResponseCallback<Schema$OrdersGetByMerchantOrderIdResponse>): void;
        /**
         * content.orders.gettestordertemplate
         * @desc Sandbox only. Retrieves an order template that can be used to
         * quickly create a new order in sandbox.
         * @alias content.orders.gettestordertemplate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.country The country of the template to retrieve. Defaults to US.
         * @param {string} params.merchantId The ID of the account that should manage the order. This cannot be a multi-client account.
         * @param {string} params.templateName The name of the template to retrieve.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        gettestordertemplate(params?: Params$Resource$Orders$Gettestordertemplate, options?: MethodOptions): AxiosPromise<Schema$OrdersGetTestOrderTemplateResponse>;
        gettestordertemplate(params: Params$Resource$Orders$Gettestordertemplate, options: MethodOptions | BodyResponseCallback<Schema$OrdersGetTestOrderTemplateResponse>, callback: BodyResponseCallback<Schema$OrdersGetTestOrderTemplateResponse>): void;
        gettestordertemplate(params: Params$Resource$Orders$Gettestordertemplate, callback: BodyResponseCallback<Schema$OrdersGetTestOrderTemplateResponse>): void;
        gettestordertemplate(callback: BodyResponseCallback<Schema$OrdersGetTestOrderTemplateResponse>): void;
        /**
         * content.orders.instorerefundlineitem
         * @desc Notifies that item return and refund was handled directly by
         * merchant outside of Google payments processing (e.g. cash refund done in
         * store).
         * @alias content.orders.instorerefundlineitem
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersInStoreRefundLineItemRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        instorerefundlineitem(params?: Params$Resource$Orders$Instorerefundlineitem, options?: MethodOptions): AxiosPromise<Schema$OrdersInStoreRefundLineItemResponse>;
        instorerefundlineitem(params: Params$Resource$Orders$Instorerefundlineitem, options: MethodOptions | BodyResponseCallback<Schema$OrdersInStoreRefundLineItemResponse>, callback: BodyResponseCallback<Schema$OrdersInStoreRefundLineItemResponse>): void;
        instorerefundlineitem(params: Params$Resource$Orders$Instorerefundlineitem, callback: BodyResponseCallback<Schema$OrdersInStoreRefundLineItemResponse>): void;
        instorerefundlineitem(callback: BodyResponseCallback<Schema$OrdersInStoreRefundLineItemResponse>): void;
        /**
         * content.orders.list
         * @desc Lists the orders in your Merchant Center account.
         * @alias content.orders.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.acknowledged Obtains orders that match the acknowledgement status. When set to true, obtains orders that have been acknowledged. When false, obtains orders that have not been acknowledged. We recommend using this filter set to false, in conjunction with the acknowledge call, such that only un-acknowledged orders are returned.
         * @param {integer=} params.maxResults The maximum number of orders to return in the response, used for paging. The default value is 25 orders per page, and the maximum allowed value is 250 orders per page. Known issue: All List calls will return all Orders without limit regardless of the value of this field.
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string=} params.orderBy The ordering of the returned list. The only supported value are placedDate desc and placedDate asc for now, which returns orders sorted by placement date. "placedDate desc" stands for listing orders by placement date, from oldest to most recent. "placedDate asc" stands for listing orders by placement date, from most recent to oldest. In future releases we'll support other sorting criteria.
         * @param {string=} params.pageToken The token returned by the previous request.
         * @param {string=} params.placedDateEnd Obtains orders placed before this date (exclusively), in ISO 8601 format.
         * @param {string=} params.placedDateStart Obtains orders placed after this date (inclusively), in ISO 8601 format.
         * @param {string=} params.statuses Obtains orders that match any of the specified statuses. Multiple values can be specified with comma separation. Additionally, please note that active is a shortcut for pendingShipment and partiallyShipped, and completed is a shortcut for shipped , partiallyDelivered, delivered, partiallyReturned, returned, and canceled.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Orders$List, options?: MethodOptions): AxiosPromise<Schema$OrdersListResponse>;
        list(params: Params$Resource$Orders$List, options: MethodOptions | BodyResponseCallback<Schema$OrdersListResponse>, callback: BodyResponseCallback<Schema$OrdersListResponse>): void;
        list(params: Params$Resource$Orders$List, callback: BodyResponseCallback<Schema$OrdersListResponse>): void;
        list(callback: BodyResponseCallback<Schema$OrdersListResponse>): void;
        /**
         * content.orders.refund
         * @desc Deprecated, please use returnRefundLineItem instead.
         * @alias content.orders.refund
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order to refund.
         * @param {().OrdersRefundRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        refund(params?: Params$Resource$Orders$Refund, options?: MethodOptions): AxiosPromise<Schema$OrdersRefundResponse>;
        refund(params: Params$Resource$Orders$Refund, options: MethodOptions | BodyResponseCallback<Schema$OrdersRefundResponse>, callback: BodyResponseCallback<Schema$OrdersRefundResponse>): void;
        refund(params: Params$Resource$Orders$Refund, callback: BodyResponseCallback<Schema$OrdersRefundResponse>): void;
        refund(callback: BodyResponseCallback<Schema$OrdersRefundResponse>): void;
        /**
         * content.orders.rejectreturnlineitem
         * @desc Rejects return on an line item.
         * @alias content.orders.rejectreturnlineitem
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersRejectReturnLineItemRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        rejectreturnlineitem(params?: Params$Resource$Orders$Rejectreturnlineitem, options?: MethodOptions): AxiosPromise<Schema$OrdersRejectReturnLineItemResponse>;
        rejectreturnlineitem(params: Params$Resource$Orders$Rejectreturnlineitem, options: MethodOptions | BodyResponseCallback<Schema$OrdersRejectReturnLineItemResponse>, callback: BodyResponseCallback<Schema$OrdersRejectReturnLineItemResponse>): void;
        rejectreturnlineitem(params: Params$Resource$Orders$Rejectreturnlineitem, callback: BodyResponseCallback<Schema$OrdersRejectReturnLineItemResponse>): void;
        rejectreturnlineitem(callback: BodyResponseCallback<Schema$OrdersRejectReturnLineItemResponse>): void;
        /**
         * content.orders.returnlineitem
         * @desc Returns a line item.
         * @alias content.orders.returnlineitem
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersReturnLineItemRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        returnlineitem(params?: Params$Resource$Orders$Returnlineitem, options?: MethodOptions): AxiosPromise<Schema$OrdersReturnLineItemResponse>;
        returnlineitem(params: Params$Resource$Orders$Returnlineitem, options: MethodOptions | BodyResponseCallback<Schema$OrdersReturnLineItemResponse>, callback: BodyResponseCallback<Schema$OrdersReturnLineItemResponse>): void;
        returnlineitem(params: Params$Resource$Orders$Returnlineitem, callback: BodyResponseCallback<Schema$OrdersReturnLineItemResponse>): void;
        returnlineitem(callback: BodyResponseCallback<Schema$OrdersReturnLineItemResponse>): void;
        /**
         * content.orders.returnrefundlineitem
         * @desc Returns and refunds a line item. Note that this method can only be
         * called on fully shipped orders.
         * @alias content.orders.returnrefundlineitem
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersReturnRefundLineItemRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        returnrefundlineitem(params?: Params$Resource$Orders$Returnrefundlineitem, options?: MethodOptions): AxiosPromise<Schema$OrdersReturnRefundLineItemResponse>;
        returnrefundlineitem(params: Params$Resource$Orders$Returnrefundlineitem, options: MethodOptions | BodyResponseCallback<Schema$OrdersReturnRefundLineItemResponse>, callback: BodyResponseCallback<Schema$OrdersReturnRefundLineItemResponse>): void;
        returnrefundlineitem(params: Params$Resource$Orders$Returnrefundlineitem, callback: BodyResponseCallback<Schema$OrdersReturnRefundLineItemResponse>): void;
        returnrefundlineitem(callback: BodyResponseCallback<Schema$OrdersReturnRefundLineItemResponse>): void;
        /**
         * content.orders.setlineitemmetadata
         * @desc Sets (overrides) merchant provided annotations on the line item.
         * @alias content.orders.setlineitemmetadata
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersSetLineItemMetadataRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setlineitemmetadata(params?: Params$Resource$Orders$Setlineitemmetadata, options?: MethodOptions): AxiosPromise<Schema$OrdersSetLineItemMetadataResponse>;
        setlineitemmetadata(params: Params$Resource$Orders$Setlineitemmetadata, options: MethodOptions | BodyResponseCallback<Schema$OrdersSetLineItemMetadataResponse>, callback: BodyResponseCallback<Schema$OrdersSetLineItemMetadataResponse>): void;
        setlineitemmetadata(params: Params$Resource$Orders$Setlineitemmetadata, callback: BodyResponseCallback<Schema$OrdersSetLineItemMetadataResponse>): void;
        setlineitemmetadata(callback: BodyResponseCallback<Schema$OrdersSetLineItemMetadataResponse>): void;
        /**
         * content.orders.shiplineitems
         * @desc Marks line item(s) as shipped.
         * @alias content.orders.shiplineitems
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersShipLineItemsRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        shiplineitems(params?: Params$Resource$Orders$Shiplineitems, options?: MethodOptions): AxiosPromise<Schema$OrdersShipLineItemsResponse>;
        shiplineitems(params: Params$Resource$Orders$Shiplineitems, options: MethodOptions | BodyResponseCallback<Schema$OrdersShipLineItemsResponse>, callback: BodyResponseCallback<Schema$OrdersShipLineItemsResponse>): void;
        shiplineitems(params: Params$Resource$Orders$Shiplineitems, callback: BodyResponseCallback<Schema$OrdersShipLineItemsResponse>): void;
        shiplineitems(callback: BodyResponseCallback<Schema$OrdersShipLineItemsResponse>): void;
        /**
         * content.orders.updatelineitemshippingdetails
         * @desc Updates ship by and delivery by dates for a line item.
         * @alias content.orders.updatelineitemshippingdetails
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersUpdateLineItemShippingDetailsRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updatelineitemshippingdetails(params?: Params$Resource$Orders$Updatelineitemshippingdetails, options?: MethodOptions): AxiosPromise<Schema$OrdersUpdateLineItemShippingDetailsResponse>;
        updatelineitemshippingdetails(params: Params$Resource$Orders$Updatelineitemshippingdetails, options: MethodOptions | BodyResponseCallback<Schema$OrdersUpdateLineItemShippingDetailsResponse>, callback: BodyResponseCallback<Schema$OrdersUpdateLineItemShippingDetailsResponse>): void;
        updatelineitemshippingdetails(params: Params$Resource$Orders$Updatelineitemshippingdetails, callback: BodyResponseCallback<Schema$OrdersUpdateLineItemShippingDetailsResponse>): void;
        updatelineitemshippingdetails(callback: BodyResponseCallback<Schema$OrdersUpdateLineItemShippingDetailsResponse>): void;
        /**
         * content.orders.updatemerchantorderid
         * @desc Updates the merchant order ID for a given order.
         * @alias content.orders.updatemerchantorderid
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersUpdateMerchantOrderIdRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updatemerchantorderid(params?: Params$Resource$Orders$Updatemerchantorderid, options?: MethodOptions): AxiosPromise<Schema$OrdersUpdateMerchantOrderIdResponse>;
        updatemerchantorderid(params: Params$Resource$Orders$Updatemerchantorderid, options: MethodOptions | BodyResponseCallback<Schema$OrdersUpdateMerchantOrderIdResponse>, callback: BodyResponseCallback<Schema$OrdersUpdateMerchantOrderIdResponse>): void;
        updatemerchantorderid(params: Params$Resource$Orders$Updatemerchantorderid, callback: BodyResponseCallback<Schema$OrdersUpdateMerchantOrderIdResponse>): void;
        updatemerchantorderid(callback: BodyResponseCallback<Schema$OrdersUpdateMerchantOrderIdResponse>): void;
        /**
         * content.orders.updateshipment
         * @desc Updates a shipment's status, carrier, and/or tracking ID.
         * @alias content.orders.updateshipment
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.merchantId The ID of the account that manages the order. This cannot be a multi-client account.
         * @param {string} params.orderId The ID of the order.
         * @param {().OrdersUpdateShipmentRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateshipment(params?: Params$Resource$Orders$Updateshipment, options?: MethodOptions): AxiosPromise<Schema$OrdersUpdateShipmentResponse>;
        updateshipment(params: Params$Resource$Orders$Updateshipment, options: MethodOptions | BodyResponseCallback<Schema$OrdersUpdateShipmentResponse>, callback: BodyResponseCallback<Schema$OrdersUpdateShipmentResponse>): void;
        updateshipment(params: Params$Resource$Orders$Updateshipment, callback: BodyResponseCallback<Schema$OrdersUpdateShipmentResponse>): void;
        updateshipment(callback: BodyResponseCallback<Schema$OrdersUpdateShipmentResponse>): void;
    }
    interface Params$Resource$Orders$Acknowledge {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersAcknowledgeRequest;
    }
    interface Params$Resource$Orders$Advancetestorder {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the test order to modify.
         */
        orderId?: string;
    }
    interface Params$Resource$Orders$Cancel {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order to cancel.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCancelRequest;
    }
    interface Params$Resource$Orders$Cancellineitem {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCancelLineItemRequest;
    }
    interface Params$Resource$Orders$Canceltestorderbycustomer {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the test order to cancel.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCancelTestOrderByCustomerRequest;
    }
    interface Params$Resource$Orders$Createtestorder {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that should manage the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCreateTestOrderRequest;
    }
    interface Params$Resource$Orders$Createtestreturn {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCreateTestReturnRequest;
    }
    interface Params$Resource$Orders$Custombatch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersCustomBatchRequest;
    }
    interface Params$Resource$Orders$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
    }
    interface Params$Resource$Orders$Getbymerchantorderid {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The merchant order id to be looked for.
         */
        merchantOrderId?: string;
    }
    interface Params$Resource$Orders$Gettestordertemplate {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The country of the template to retrieve. Defaults to US.
         */
        country?: string;
        /**
         * The ID of the account that should manage the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The name of the template to retrieve.
         */
        templateName?: string;
    }
    interface Params$Resource$Orders$Instorerefundlineitem {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersInStoreRefundLineItemRequest;
    }
    interface Params$Resource$Orders$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Obtains orders that match the acknowledgement status. When set to true,
         * obtains orders that have been acknowledged. When false, obtains orders
         * that have not been acknowledged. We recommend using this filter set to
         * false, in conjunction with the acknowledge call, such that only
         * un-acknowledged orders are returned.
         */
        acknowledged?: boolean;
        /**
         * The maximum number of orders to return in the response, used for paging.
         * The default value is 25 orders per page, and the maximum allowed value is
         * 250 orders per page. Known issue: All List calls will return all Orders
         * without limit regardless of the value of this field.
         */
        maxResults?: number;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ordering of the returned list. The only supported value are
         * placedDate desc and placedDate asc for now, which returns orders sorted
         * by placement date. "placedDate desc" stands for listing orders by
         * placement date, from oldest to most recent. "placedDate asc" stands for
         * listing orders by placement date, from most recent to oldest. In future
         * releases we'll support other sorting criteria.
         */
        orderBy?: string;
        /**
         * The token returned by the previous request.
         */
        pageToken?: string;
        /**
         * Obtains orders placed before this date (exclusively), in ISO 8601 format.
         */
        placedDateEnd?: string;
        /**
         * Obtains orders placed after this date (inclusively), in ISO 8601 format.
         */
        placedDateStart?: string;
        /**
         * Obtains orders that match any of the specified statuses. Multiple values
         * can be specified with comma separation. Additionally, please note that
         * active is a shortcut for pendingShipment and partiallyShipped, and
         * completed is a shortcut for shipped , partiallyDelivered, delivered,
         * partiallyReturned, returned, and canceled.
         */
        statuses?: string;
    }
    interface Params$Resource$Orders$Refund {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order to refund.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersRefundRequest;
    }
    interface Params$Resource$Orders$Rejectreturnlineitem {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersRejectReturnLineItemRequest;
    }
    interface Params$Resource$Orders$Returnlineitem {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersReturnLineItemRequest;
    }
    interface Params$Resource$Orders$Returnrefundlineitem {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersReturnRefundLineItemRequest;
    }
    interface Params$Resource$Orders$Setlineitemmetadata {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersSetLineItemMetadataRequest;
    }
    interface Params$Resource$Orders$Shiplineitems {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersShipLineItemsRequest;
    }
    interface Params$Resource$Orders$Updatelineitemshippingdetails {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersUpdateLineItemShippingDetailsRequest;
    }
    interface Params$Resource$Orders$Updatemerchantorderid {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersUpdateMerchantOrderIdRequest;
    }
    interface Params$Resource$Orders$Updateshipment {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The ID of the account that manages the order. This cannot be a
         * multi-client account.
         */
        merchantId?: string;
        /**
         * The ID of the order.
         */
        orderId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrdersUpdateShipmentRequest;
    }
}
