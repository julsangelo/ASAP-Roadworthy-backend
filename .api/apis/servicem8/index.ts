import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'servicem8/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary List all Allocation Windows
   * @throws FetchError<400, types.ListAllocationWindowsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListAllocationWindowsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListAllocationWindowsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListAllocationWindowsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListAllocationWindowsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listAllocationWindows(): Promise<FetchResponse<200, types.ListAllocationWindowsResponse200>> {
    return this.core.fetch('/allocationwindow.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Allocation Window
   * @throws FetchError<400, types.CreateAllocationWindowsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateAllocationWindowsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateAllocationWindowsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateAllocationWindowsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateAllocationWindowsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createAllocationWindows(body: types.CreateAllocationWindowsBodyParam): Promise<FetchResponse<200, types.CreateAllocationWindowsResponse200>> {
    return this.core.fetch('/allocationwindow.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary Retrieve an Allocation Window
   * @throws FetchError<400, types.GetAllocationWindowsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetAllocationWindowsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetAllocationWindowsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetAllocationWindowsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetAllocationWindowsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetAllocationWindowsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getAllocationWindows(metadata: types.GetAllocationWindowsMetadataParam): Promise<FetchResponse<200, types.GetAllocationWindowsResponse200>> {
    return this.core.fetch('/allocationwindow/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Update an Allocation Window
   * @throws FetchError<400, types.UpdateAllocationWindowsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateAllocationWindowsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateAllocationWindowsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateAllocationWindowsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateAllocationWindowsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateAllocationWindowsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateAllocationWindows(body: types.UpdateAllocationWindowsBodyParam, metadata: types.UpdateAllocationWindowsMetadataParam): Promise<FetchResponse<200, types.UpdateAllocationWindowsResponse200>> {
    return this.core.fetch('/allocationwindow/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Delete an Allocation Window
   * @throws FetchError<400, types.DeleteAllocationWindowsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteAllocationWindowsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteAllocationWindowsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteAllocationWindowsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteAllocationWindowsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteAllocationWindowsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteAllocationWindows(metadata: types.DeleteAllocationWindowsMetadataParam): Promise<FetchResponse<200, types.DeleteAllocationWindowsResponse200>> {
    return this.core.fetch('/allocationwindow/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary List all Assets
   * @throws FetchError<400, types.ListAssetsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListAssetsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListAssetsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListAssetsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListAssetsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listAssets(): Promise<FetchResponse<200, types.ListAssetsResponse200>> {
    return this.core.fetch('/asset.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary Retrieve an Asset
   * @throws FetchError<400, types.GetAssetsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetAssetsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetAssetsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetAssetsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetAssetsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetAssetsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getAssets(metadata: types.GetAssetsMetadataParam): Promise<FetchResponse<200, types.GetAssetsResponse200>> {
    return this.core.fetch('/asset/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Update an Asset
   * @throws FetchError<400, types.UpdateAssetsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateAssetsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateAssetsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateAssetsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateAssetsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateAssetsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateAssets(body: types.UpdateAssetsBodyParam, metadata: types.UpdateAssetsMetadataParam): Promise<FetchResponse<200, types.UpdateAssetsResponse200>> {
    return this.core.fetch('/asset/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Delete an Asset
   * @throws FetchError<400, types.DeleteAssetsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteAssetsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteAssetsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteAssetsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteAssetsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteAssetsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteAssets(metadata: types.DeleteAssetsMetadataParam): Promise<FetchResponse<200, types.DeleteAssetsResponse200>> {
    return this.core.fetch('/asset/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary List all Asset Types
   * @throws FetchError<400, types.ListAssetTypesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListAssetTypesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListAssetTypesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListAssetTypesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListAssetTypesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listAssetTypes(): Promise<FetchResponse<200, types.ListAssetTypesResponse200>> {
    return this.core.fetch('/assettype.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Asset Type
   * @throws FetchError<400, types.CreateAssetTypesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateAssetTypesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateAssetTypesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateAssetTypesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateAssetTypesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createAssetTypes(body: types.CreateAssetTypesBodyParam): Promise<FetchResponse<200, types.CreateAssetTypesResponse200>> {
    return this.core.fetch('/assettype.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary Retrieve an Asset Type
   * @throws FetchError<400, types.GetAssetTypesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetAssetTypesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetAssetTypesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetAssetTypesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetAssetTypesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetAssetTypesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getAssetTypes(metadata: types.GetAssetTypesMetadataParam): Promise<FetchResponse<200, types.GetAssetTypesResponse200>> {
    return this.core.fetch('/assettype/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Update an Asset Type
   * @throws FetchError<400, types.UpdateAssetTypesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateAssetTypesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateAssetTypesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateAssetTypesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateAssetTypesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateAssetTypesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateAssetTypes(body: types.UpdateAssetTypesBodyParam, metadata: types.UpdateAssetTypesMetadataParam): Promise<FetchResponse<200, types.UpdateAssetTypesResponse200>> {
    return this.core.fetch('/assettype/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Delete an Asset Type
   * @throws FetchError<400, types.DeleteAssetTypesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteAssetTypesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteAssetTypesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteAssetTypesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteAssetTypesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteAssetTypesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteAssetTypes(metadata: types.DeleteAssetTypesMetadataParam): Promise<FetchResponse<200, types.DeleteAssetTypesResponse200>> {
    return this.core.fetch('/assettype/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary List all Asset Type Fields
   * @throws FetchError<400, types.ListAssetTypeFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListAssetTypeFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListAssetTypeFieldsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListAssetTypeFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListAssetTypeFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listAssetTypeFields(): Promise<FetchResponse<200, types.ListAssetTypeFieldsResponse200>> {
    return this.core.fetch('/assettypefield.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Asset Type Field
   * @throws FetchError<400, types.CreateAssetTypeFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateAssetTypeFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateAssetTypeFieldsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateAssetTypeFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateAssetTypeFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createAssetTypeFields(body: types.CreateAssetTypeFieldsBodyParam): Promise<FetchResponse<200, types.CreateAssetTypeFieldsResponse200>> {
    return this.core.fetch('/assettypefield.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_assets**.
   *
   * @summary Retrieve an Asset Type Field
   * @throws FetchError<400, types.GetAssetTypeFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetAssetTypeFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetAssetTypeFieldsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetAssetTypeFieldsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetAssetTypeFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetAssetTypeFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getAssetTypeFields(metadata: types.GetAssetTypeFieldsMetadataParam): Promise<FetchResponse<200, types.GetAssetTypeFieldsResponse200>> {
    return this.core.fetch('/assettypefield/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Update an Asset Type Field
   * @throws FetchError<400, types.UpdateAssetTypeFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateAssetTypeFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateAssetTypeFieldsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateAssetTypeFieldsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateAssetTypeFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateAssetTypeFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateAssetTypeFields(body: types.UpdateAssetTypeFieldsBodyParam, metadata: types.UpdateAssetTypeFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateAssetTypeFieldsResponse200>> {
    return this.core.fetch('/assettypefield/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_assets**.
   *
   * @summary Delete an Asset Type Field
   * @throws FetchError<400, types.DeleteAssetTypeFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteAssetTypeFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteAssetTypeFieldsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteAssetTypeFieldsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteAssetTypeFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteAssetTypeFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteAssetTypeFields(metadata: types.DeleteAssetTypeFieldsMetadataParam): Promise<FetchResponse<200, types.DeleteAssetTypeFieldsResponse200>> {
    return this.core.fetch('/assettypefield/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_attachments**.
   *
   * @summary List all Attachments
   * @throws FetchError<400, types.ListAttachmentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListAttachmentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListAttachmentsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListAttachmentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListAttachmentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listAttachments(): Promise<FetchResponse<200, types.ListAttachmentsResponse200>> {
    return this.core.fetch('/attachment.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_attachments**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Attachment
   * @throws FetchError<400, types.CreateAttachmentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateAttachmentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateAttachmentsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateAttachmentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateAttachmentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createAttachments(body: types.CreateAttachmentsBodyParam): Promise<FetchResponse<200, types.CreateAttachmentsResponse200>> {
    return this.core.fetch('/attachment.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_attachments**.
   *
   * @summary Retrieve an Attachment
   * @throws FetchError<400, types.GetAttachmentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetAttachmentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetAttachmentsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetAttachmentsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetAttachmentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetAttachmentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getAttachments(metadata: types.GetAttachmentsMetadataParam): Promise<FetchResponse<200, types.GetAttachmentsResponse200>> {
    return this.core.fetch('/dboattachment/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_attachments**.
   *
   * @summary Update an Attachment
   * @throws FetchError<400, types.UpdateAttachmentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateAttachmentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateAttachmentsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateAttachmentsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateAttachmentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateAttachmentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateAttachments(body: types.UpdateAttachmentsBodyParam, metadata: types.UpdateAttachmentsMetadataParam): Promise<FetchResponse<200, types.UpdateAttachmentsResponse200>> {
    return this.core.fetch('/dboattachment/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_attachments**.
   *
   * @summary Delete an Attachment
   * @throws FetchError<400, types.DeleteAttachmentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteAttachmentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteAttachmentsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteAttachmentsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteAttachmentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteAttachmentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteAttachments(metadata: types.DeleteAttachmentsMetadataParam): Promise<FetchResponse<200, types.DeleteAttachmentsResponse200>> {
    return this.core.fetch('/dboattachment/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_badges**.
   *
   * @summary List all Badges
   * @throws FetchError<400, types.ListBadgesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListBadgesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListBadgesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListBadgesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListBadgesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listBadges(): Promise<FetchResponse<200, types.ListBadgesResponse200>> {
    return this.core.fetch('/badge.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_badges**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Badge
   * @throws FetchError<400, types.CreateBadgesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateBadgesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateBadgesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateBadgesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateBadgesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createBadges(body: types.CreateBadgesBodyParam): Promise<FetchResponse<200, types.CreateBadgesResponse200>> {
    return this.core.fetch('/badge.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_badges**.
   *
   * @summary Retrieve a Badge
   * @throws FetchError<400, types.GetBadgesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetBadgesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetBadgesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetBadgesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetBadgesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetBadgesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getBadges(metadata: types.GetBadgesMetadataParam): Promise<FetchResponse<200, types.GetBadgesResponse200>> {
    return this.core.fetch('/badge/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_badges**.
   *
   * @summary Update a Badge
   * @throws FetchError<400, types.UpdateBadgesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateBadgesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateBadgesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateBadgesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateBadgesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateBadgesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateBadges(body: types.UpdateBadgesBodyParam, metadata: types.UpdateBadgesMetadataParam): Promise<FetchResponse<200, types.UpdateBadgesResponse200>> {
    return this.core.fetch('/badge/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_badges**.
   *
   * @summary Delete a Badge
   * @throws FetchError<400, types.DeleteBadgesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteBadgesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteBadgesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteBadgesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteBadgesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteBadgesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteBadges(metadata: types.DeleteBadgesMetadataParam): Promise<FetchResponse<200, types.DeleteBadgesResponse200>> {
    return this.core.fetch('/badge/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_categories**.
   *
   * @summary List all Categories
   * @throws FetchError<400, types.ListCategoriesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListCategoriesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListCategoriesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListCategoriesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListCategoriesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listCategories(): Promise<FetchResponse<200, types.ListCategoriesResponse200>> {
    return this.core.fetch('/category.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_categories**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Category
   * @throws FetchError<400, types.CreateCategoriesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateCategoriesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateCategoriesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateCategoriesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateCategoriesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createCategories(body: types.CreateCategoriesBodyParam): Promise<FetchResponse<200, types.CreateCategoriesResponse200>> {
    return this.core.fetch('/category.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_categories**.
   *
   * @summary Retrieve a Category
   * @throws FetchError<400, types.GetCategoriesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetCategoriesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetCategoriesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetCategoriesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetCategoriesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetCategoriesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getCategories(metadata: types.GetCategoriesMetadataParam): Promise<FetchResponse<200, types.GetCategoriesResponse200>> {
    return this.core.fetch('/category/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_categories**.
   *
   * @summary Update a Category
   * @throws FetchError<400, types.UpdateCategoriesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateCategoriesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateCategoriesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateCategoriesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateCategoriesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateCategoriesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateCategories(body: types.UpdateCategoriesBodyParam, metadata: types.UpdateCategoriesMetadataParam): Promise<FetchResponse<200, types.UpdateCategoriesResponse200>> {
    return this.core.fetch('/category/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_categories**.
   *
   * @summary Delete a Category
   * @throws FetchError<400, types.DeleteCategoriesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteCategoriesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteCategoriesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteCategoriesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteCategoriesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteCategoriesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteCategories(metadata: types.DeleteCategoriesMetadataParam): Promise<FetchResponse<200, types.DeleteCategoriesResponse200>> {
    return this.core.fetch('/category/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_customers**.
   *
   * @summary List all Clients
   * @throws FetchError<400, types.ListClientsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListClientsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListClientsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListClientsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListClientsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listClients(): Promise<FetchResponse<200, types.ListClientsResponse200>> {
    return this.core.fetch('/company.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customers**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Client
   * @throws FetchError<400, types.CreateClientsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateClientsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateClientsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateClientsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateClientsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createClients(body: types.CreateClientsBodyParam): Promise<FetchResponse<200, types.CreateClientsResponse200>> {
    return this.core.fetch('/company.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_customers**.
   *
   * @summary Retrieve a Client
   * @throws FetchError<400, types.GetClientsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetClientsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetClientsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetClientsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetClientsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetClientsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getClients(metadata: types.GetClientsMetadataParam): Promise<FetchResponse<200, types.GetClientsResponse200>> {
    return this.core.fetch('/company/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customers**.
   *
   * @summary Update a Client
   * @throws FetchError<400, types.UpdateClientsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateClientsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateClientsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateClientsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateClientsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateClientsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateClients(body: types.UpdateClientsBodyParam, metadata: types.UpdateClientsMetadataParam): Promise<FetchResponse<200, types.UpdateClientsResponse200>> {
    return this.core.fetch('/company/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customers**.
   *
   * @summary Delete a Client
   * @throws FetchError<400, types.DeleteClientsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteClientsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteClientsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteClientsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteClientsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteClientsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteClients(metadata: types.DeleteClientsMetadataParam): Promise<FetchResponse<200, types.DeleteClientsResponse200>> {
    return this.core.fetch('/company/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_customer_contacts**.
   *
   * @summary List all Company Contacts
   * @throws FetchError<400, types.ListCompanyContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListCompanyContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListCompanyContactsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListCompanyContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListCompanyContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listCompanyContacts(): Promise<FetchResponse<200, types.ListCompanyContactsResponse200>> {
    return this.core.fetch('/companycontact.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customer_contacts**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Company Contact
   * @throws FetchError<400, types.CreateCompanyContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateCompanyContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateCompanyContactsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateCompanyContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateCompanyContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createCompanyContacts(body: types.CreateCompanyContactsBodyParam): Promise<FetchResponse<200, types.CreateCompanyContactsResponse200>> {
    return this.core.fetch('/companycontact.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_customer_contacts**.
   *
   * @summary Retrieve a Company Contact
   * @throws FetchError<400, types.GetCompanyContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetCompanyContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetCompanyContactsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetCompanyContactsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetCompanyContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetCompanyContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getCompanyContacts(metadata: types.GetCompanyContactsMetadataParam): Promise<FetchResponse<200, types.GetCompanyContactsResponse200>> {
    return this.core.fetch('/companycontact/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customer_contacts**.
   *
   * @summary Update a Company Contact
   * @throws FetchError<400, types.UpdateCompanyContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateCompanyContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateCompanyContactsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateCompanyContactsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateCompanyContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateCompanyContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateCompanyContacts(body: types.UpdateCompanyContactsBodyParam, metadata: types.UpdateCompanyContactsMetadataParam): Promise<FetchResponse<200, types.UpdateCompanyContactsResponse200>> {
    return this.core.fetch('/companycontact/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_customer_contacts**.
   *
   * @summary Delete a Company Contact
   * @throws FetchError<400, types.DeleteCompanyContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteCompanyContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteCompanyContactsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteCompanyContactsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteCompanyContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteCompanyContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteCompanyContacts(metadata: types.DeleteCompanyContactsMetadataParam): Promise<FetchResponse<200, types.DeleteCompanyContactsResponse200>> {
    return this.core.fetch('/companycontact/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary List all Document Templates
   * @throws FetchError<400, types.ListDocumentTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListDocumentTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListDocumentTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListDocumentTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListDocumentTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listDocumentTemplates(): Promise<FetchResponse<200, types.ListDocumentTemplatesResponse200>> {
    return this.core.fetch('/documenttemplate.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Document Template
   * @throws FetchError<400, types.CreateDocumentTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateDocumentTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateDocumentTemplatesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateDocumentTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateDocumentTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createDocumentTemplates(body: types.CreateDocumentTemplatesBodyParam): Promise<FetchResponse<200, types.CreateDocumentTemplatesResponse200>> {
    return this.core.fetch('/documenttemplate.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Retrieve a Document Template
   * @throws FetchError<400, types.GetDocumentTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetDocumentTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetDocumentTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetDocumentTemplatesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetDocumentTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetDocumentTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getDocumentTemplates(metadata: types.GetDocumentTemplatesMetadataParam): Promise<FetchResponse<200, types.GetDocumentTemplatesResponse200>> {
    return this.core.fetch('/documenttemplate/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Update a Document Template
   * @throws FetchError<400, types.UpdateDocumentTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateDocumentTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateDocumentTemplatesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateDocumentTemplatesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateDocumentTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateDocumentTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateDocumentTemplates(body: types.UpdateDocumentTemplatesBodyParam, metadata: types.UpdateDocumentTemplatesMetadataParam): Promise<FetchResponse<200, types.UpdateDocumentTemplatesResponse200>> {
    return this.core.fetch('/documenttemplate/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Delete a Document Template
   * @throws FetchError<400, types.DeleteDocumentTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteDocumentTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteDocumentTemplatesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteDocumentTemplatesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteDocumentTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteDocumentTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteDocumentTemplates(metadata: types.DeleteDocumentTemplatesMetadataParam): Promise<FetchResponse<200, types.DeleteDocumentTemplatesResponse200>> {
    return this.core.fetch('/documenttemplate/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary List all Email Templates
   * @throws FetchError<400, types.ListEmailTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListEmailTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListEmailTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListEmailTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListEmailTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listEmailTemplates(): Promise<FetchResponse<200, types.ListEmailTemplatesResponse200>> {
    return this.core.fetch('/emailtemplate.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Email Template
   * @throws FetchError<400, types.CreateEmailTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateEmailTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateEmailTemplatesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateEmailTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateEmailTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createEmailTemplates(body: types.CreateEmailTemplatesBodyParam): Promise<FetchResponse<200, types.CreateEmailTemplatesResponse200>> {
    return this.core.fetch('/emailtemplate.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Retrieve an Email Template
   * @throws FetchError<400, types.GetEmailTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetEmailTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetEmailTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetEmailTemplatesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetEmailTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetEmailTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getEmailTemplates(metadata: types.GetEmailTemplatesMetadataParam): Promise<FetchResponse<200, types.GetEmailTemplatesResponse200>> {
    return this.core.fetch('/emailtemplate/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Update an Email Template
   * @throws FetchError<400, types.UpdateEmailTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateEmailTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateEmailTemplatesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateEmailTemplatesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateEmailTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateEmailTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateEmailTemplates(body: types.UpdateEmailTemplatesBodyParam, metadata: types.UpdateEmailTemplatesMetadataParam): Promise<FetchResponse<200, types.UpdateEmailTemplatesResponse200>> {
    return this.core.fetch('/emailtemplate/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Delete an Email Template
   * @throws FetchError<400, types.DeleteEmailTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteEmailTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteEmailTemplatesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteEmailTemplatesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteEmailTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteEmailTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteEmailTemplates(metadata: types.DeleteEmailTemplatesMetadataParam): Promise<FetchResponse<200, types.DeleteEmailTemplatesResponse200>> {
    return this.core.fetch('/emailtemplate/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_feedback**.
   *
   * @summary List all Feedback
   * @throws FetchError<400, types.ListFeedbackResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListFeedbackResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListFeedbackResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListFeedbackResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListFeedbackResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listFeedback(): Promise<FetchResponse<200, types.ListFeedbackResponse200>> {
    return this.core.fetch('/feedback.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_feedback**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Feedback
   * @throws FetchError<400, types.CreateFeedbackResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateFeedbackResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateFeedbackResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateFeedbackResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateFeedbackResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createFeedback(body: types.CreateFeedbackBodyParam): Promise<FetchResponse<200, types.CreateFeedbackResponse200>> {
    return this.core.fetch('/feedback.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_feedback**.
   *
   * @summary Retrieve a Feedback
   * @throws FetchError<400, types.GetFeedbackResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetFeedbackResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetFeedbackResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetFeedbackResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetFeedbackResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetFeedbackResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getFeedback(metadata: types.GetFeedbackMetadataParam): Promise<FetchResponse<200, types.GetFeedbackResponse200>> {
    return this.core.fetch('/feedback/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_feedback**.
   *
   * @summary Update a Feedback
   * @throws FetchError<400, types.UpdateFeedbackResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateFeedbackResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateFeedbackResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateFeedbackResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateFeedbackResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateFeedbackResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateFeedback(body: types.UpdateFeedbackBodyParam, metadata: types.UpdateFeedbackMetadataParam): Promise<FetchResponse<200, types.UpdateFeedbackResponse200>> {
    return this.core.fetch('/feedback/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_feedback**.
   *
   * @summary Delete a Feedback
   * @throws FetchError<400, types.DeleteFeedbackResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteFeedbackResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteFeedbackResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteFeedbackResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteFeedbackResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteFeedbackResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteFeedback(metadata: types.DeleteFeedbackMetadataParam): Promise<FetchResponse<200, types.DeleteFeedbackResponse200>> {
    return this.core.fetch('/feedback/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary List all Forms
   * @throws FetchError<400, types.ListFormsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListFormsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListFormsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListFormsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListFormsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listForms(): Promise<FetchResponse<200, types.ListFormsResponse200>> {
    return this.core.fetch('/form.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Form
   * @throws FetchError<400, types.CreateFormsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateFormsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateFormsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateFormsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateFormsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createForms(body: types.CreateFormsBodyParam): Promise<FetchResponse<200, types.CreateFormsResponse200>> {
    return this.core.fetch('/form.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary Retrieve a Form
   * @throws FetchError<400, types.GetFormsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetFormsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetFormsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetFormsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetFormsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetFormsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getForms(metadata: types.GetFormsMetadataParam): Promise<FetchResponse<200, types.GetFormsResponse200>> {
    return this.core.fetch('/form/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Update a Form
   * @throws FetchError<400, types.UpdateFormsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateFormsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateFormsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateFormsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateFormsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateFormsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateForms(body: types.UpdateFormsBodyParam, metadata: types.UpdateFormsMetadataParam): Promise<FetchResponse<200, types.UpdateFormsResponse200>> {
    return this.core.fetch('/form/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Delete a Form
   * @throws FetchError<400, types.DeleteFormsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteFormsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteFormsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteFormsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteFormsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteFormsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteForms(metadata: types.DeleteFormsMetadataParam): Promise<FetchResponse<200, types.DeleteFormsResponse200>> {
    return this.core.fetch('/form/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary List all Form Fields
   * @throws FetchError<400, types.ListFormFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListFormFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListFormFieldsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListFormFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListFormFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listFormFields(): Promise<FetchResponse<200, types.ListFormFieldsResponse200>> {
    return this.core.fetch('/formfield.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Form Field
   * @throws FetchError<400, types.CreateFormFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateFormFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateFormFieldsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateFormFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateFormFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createFormFields(body: types.CreateFormFieldsBodyParam): Promise<FetchResponse<200, types.CreateFormFieldsResponse200>> {
    return this.core.fetch('/formfield.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary Retrieve a Form Field
   * @throws FetchError<400, types.GetFormFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetFormFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetFormFieldsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetFormFieldsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetFormFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetFormFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getFormFields(metadata: types.GetFormFieldsMetadataParam): Promise<FetchResponse<200, types.GetFormFieldsResponse200>> {
    return this.core.fetch('/formfield/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Update a Form Field
   * @throws FetchError<400, types.UpdateFormFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateFormFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateFormFieldsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateFormFieldsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateFormFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateFormFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateFormFields(body: types.UpdateFormFieldsBodyParam, metadata: types.UpdateFormFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateFormFieldsResponse200>> {
    return this.core.fetch('/formfield/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Delete a Form Field
   * @throws FetchError<400, types.DeleteFormFieldsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteFormFieldsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteFormFieldsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteFormFieldsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteFormFieldsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteFormFieldsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteFormFields(metadata: types.DeleteFormFieldsMetadataParam): Promise<FetchResponse<200, types.DeleteFormFieldsResponse200>> {
    return this.core.fetch('/formfield/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary List all Form Responses
   * @throws FetchError<400, types.ListFormResponsesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListFormResponsesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListFormResponsesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListFormResponsesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListFormResponsesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listFormResponses(): Promise<FetchResponse<200, types.ListFormResponsesResponse200>> {
    return this.core.fetch('/formresponse.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Form Response
   * @throws FetchError<400, types.CreateFormResponsesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateFormResponsesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateFormResponsesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateFormResponsesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateFormResponsesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createFormResponses(body: types.CreateFormResponsesBodyParam): Promise<FetchResponse<200, types.CreateFormResponsesResponse200>> {
    return this.core.fetch('/formresponse.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_forms**.
   *
   * @summary Retrieve a Form Response
   * @throws FetchError<400, types.GetFormResponsesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetFormResponsesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetFormResponsesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetFormResponsesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetFormResponsesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetFormResponsesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getFormResponses(metadata: types.GetFormResponsesMetadataParam): Promise<FetchResponse<200, types.GetFormResponsesResponse200>> {
    return this.core.fetch('/formresponse/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Update a Form Response
   * @throws FetchError<400, types.UpdateFormResponsesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateFormResponsesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateFormResponsesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateFormResponsesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateFormResponsesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateFormResponsesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateFormResponses(body: types.UpdateFormResponsesBodyParam, metadata: types.UpdateFormResponsesMetadataParam): Promise<FetchResponse<200, types.UpdateFormResponsesResponse200>> {
    return this.core.fetch('/formresponse/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_forms**.
   *
   * @summary Delete a Form Response
   * @throws FetchError<400, types.DeleteFormResponsesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteFormResponsesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteFormResponsesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteFormResponsesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteFormResponsesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteFormResponsesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteFormResponses(metadata: types.DeleteFormResponsesMetadataParam): Promise<FetchResponse<200, types.DeleteFormResponsesResponse200>> {
    return this.core.fetch('/formresponse/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_jobs**.
   *
   * @summary List all Jobs
   * @throws FetchError<400, types.ListJobsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobs(): Promise<FetchResponse<200, types.ListJobsResponse200>> {
    return this.core.fetch('/job.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **create_jobs**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job
   * @throws FetchError<400, types.CreateJobsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobs(body: types.CreateJobsBodyParam): Promise<FetchResponse<200, types.CreateJobsResponse200>> {
    return this.core.fetch('/job.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_jobs**.
   *
   * @summary Retrieve a Job
   * @throws FetchError<400, types.GetJobsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobs(metadata: types.GetJobsMetadataParam): Promise<FetchResponse<200, types.GetJobsResponse200>> {
    return this.core.fetch('/job/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_jobs**.
   *
   * @summary Update a Job
   * @throws FetchError<400, types.UpdateJobsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobs(body: types.UpdateJobsBodyParam, metadata: types.UpdateJobsMetadataParam): Promise<FetchResponse<200, types.UpdateJobsResponse200>> {
    return this.core.fetch('/job/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_jobs**.
   *
   * @summary Delete a Job
   * @throws FetchError<400, types.DeleteJobsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobs(metadata: types.DeleteJobsMetadataParam): Promise<FetchResponse<200, types.DeleteJobsResponse200>> {
    return this.core.fetch('/job/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary List all Job Activities
   * @throws FetchError<400, types.ListJobActivitiesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobActivitiesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobActivitiesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobActivitiesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobActivitiesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobActivities(): Promise<FetchResponse<200, types.ListJobActivitiesResponse200>> {
    return this.core.fetch('/jobactivity.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Activity
   * @throws FetchError<400, types.CreateJobActivitiesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobActivitiesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobActivitiesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobActivitiesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobActivitiesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobActivities(body: types.CreateJobActivitiesBodyParam): Promise<FetchResponse<200, types.CreateJobActivitiesResponse200>> {
    return this.core.fetch('/jobactivity.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary Retrieve a Job Activity
   * @throws FetchError<400, types.GetJobActivitiesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobActivitiesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobActivitiesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobActivitiesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobActivitiesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobActivitiesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobActivities(metadata: types.GetJobActivitiesMetadataParam): Promise<FetchResponse<200, types.GetJobActivitiesResponse200>> {
    return this.core.fetch('/jobactivity/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Update a Job Activity
   * @throws FetchError<400, types.UpdateJobActivitiesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobActivitiesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobActivitiesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobActivitiesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobActivitiesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobActivitiesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobActivities(body: types.UpdateJobActivitiesBodyParam, metadata: types.UpdateJobActivitiesMetadataParam): Promise<FetchResponse<200, types.UpdateJobActivitiesResponse200>> {
    return this.core.fetch('/jobactivity/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Delete a Job Activity
   * @throws FetchError<400, types.DeleteJobActivitiesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobActivitiesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobActivitiesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobActivitiesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobActivitiesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobActivitiesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobActivities(metadata: types.DeleteJobActivitiesMetadataParam): Promise<FetchResponse<200, types.DeleteJobActivitiesResponse200>> {
    return this.core.fetch('/jobactivity/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary List all Job Allocations
   * @throws FetchError<400, types.ListJobAllocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobAllocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobAllocationsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobAllocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobAllocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobAllocations(): Promise<FetchResponse<200, types.ListJobAllocationsResponse200>> {
    return this.core.fetch('/joballocation.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Allocation
   * @throws FetchError<400, types.CreateJobAllocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobAllocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobAllocationsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobAllocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobAllocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobAllocations(body: types.CreateJobAllocationsBodyParam): Promise<FetchResponse<200, types.CreateJobAllocationsResponse200>> {
    return this.core.fetch('/joballocation.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_schedule**.
   *
   * @summary Retrieve a Job Allocation
   * @throws FetchError<400, types.GetJobAllocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobAllocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobAllocationsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobAllocationsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobAllocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobAllocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobAllocations(metadata: types.GetJobAllocationsMetadataParam): Promise<FetchResponse<200, types.GetJobAllocationsResponse200>> {
    return this.core.fetch('/joballocation/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Update a Job Allocation
   * @throws FetchError<400, types.UpdateJobAllocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobAllocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobAllocationsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobAllocationsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobAllocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobAllocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobAllocations(body: types.UpdateJobAllocationsBodyParam, metadata: types.UpdateJobAllocationsMetadataParam): Promise<FetchResponse<200, types.UpdateJobAllocationsResponse200>> {
    return this.core.fetch('/joballocation/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_schedule**.
   *
   * @summary Delete a Job Allocation
   * @throws FetchError<400, types.DeleteJobAllocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobAllocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobAllocationsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobAllocationsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobAllocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobAllocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobAllocations(metadata: types.DeleteJobAllocationsMetadataParam): Promise<FetchResponse<200, types.DeleteJobAllocationsResponse200>> {
    return this.core.fetch('/joballocation/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_checklists**.
   *
   * @summary List all Job Checklists
   * @throws FetchError<400, types.ListJobChecklistsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobChecklistsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobChecklistsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobChecklistsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobChecklistsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobChecklists(): Promise<FetchResponse<200, types.ListJobChecklistsResponse200>> {
    return this.core.fetch('/jobchecklist.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_checklists**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Checklist
   * @throws FetchError<400, types.CreateJobChecklistsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobChecklistsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobChecklistsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobChecklistsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobChecklistsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobChecklists(body: types.CreateJobChecklistsBodyParam): Promise<FetchResponse<200, types.CreateJobChecklistsResponse200>> {
    return this.core.fetch('/jobchecklist.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_checklists**.
   *
   * @summary Retrieve a Job Checklist
   * @throws FetchError<400, types.GetJobChecklistsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobChecklistsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobChecklistsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobChecklistsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobChecklistsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobChecklistsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobChecklists(metadata: types.GetJobChecklistsMetadataParam): Promise<FetchResponse<200, types.GetJobChecklistsResponse200>> {
    return this.core.fetch('/jobchecklist/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_checklists**.
   *
   * @summary Update a Job Checklist
   * @throws FetchError<400, types.UpdateJobChecklistsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobChecklistsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobChecklistsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobChecklistsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobChecklistsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobChecklistsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobChecklists(body: types.UpdateJobChecklistsBodyParam, metadata: types.UpdateJobChecklistsMetadataParam): Promise<FetchResponse<200, types.UpdateJobChecklistsResponse200>> {
    return this.core.fetch('/jobchecklist/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_checklists**.
   *
   * @summary Delete a Job Checklist
   * @throws FetchError<400, types.DeleteJobChecklistsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobChecklistsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobChecklistsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobChecklistsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobChecklistsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobChecklistsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobChecklists(metadata: types.DeleteJobChecklistsMetadataParam): Promise<FetchResponse<200, types.DeleteJobChecklistsResponse200>> {
    return this.core.fetch('/jobchecklist/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_contacts**.
   *
   * @summary List all Job Contacts
   * @throws FetchError<400, types.ListJobContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobContactsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobContacts(): Promise<FetchResponse<200, types.ListJobContactsResponse200>> {
    return this.core.fetch('/jobcontact.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_contacts**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Contact
   * @throws FetchError<400, types.CreateJobContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobContactsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobContacts(body: types.CreateJobContactsBodyParam): Promise<FetchResponse<200, types.CreateJobContactsResponse200>> {
    return this.core.fetch('/jobcontact.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_contacts**.
   *
   * @summary Retrieve a Job Contact
   * @throws FetchError<400, types.GetJobContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobContactsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobContactsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobContacts(metadata: types.GetJobContactsMetadataParam): Promise<FetchResponse<200, types.GetJobContactsResponse200>> {
    return this.core.fetch('/jobcontact/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_contacts**.
   *
   * @summary Update a Job Contact
   * @throws FetchError<400, types.UpdateJobContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobContactsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobContactsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobContacts(body: types.UpdateJobContactsBodyParam, metadata: types.UpdateJobContactsMetadataParam): Promise<FetchResponse<200, types.UpdateJobContactsResponse200>> {
    return this.core.fetch('/jobcontact/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_contacts**.
   *
   * @summary Delete a Job Contact
   * @throws FetchError<400, types.DeleteJobContactsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobContactsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobContactsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobContactsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobContactsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobContactsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobContacts(metadata: types.DeleteJobContactsMetadataParam): Promise<FetchResponse<200, types.DeleteJobContactsResponse200>> {
    return this.core.fetch('/jobcontact/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_materials**.
   *
   * @summary List all Job Materials
   * @throws FetchError<400, types.ListJobMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobMaterialsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobMaterials(): Promise<FetchResponse<200, types.ListJobMaterialsResponse200>> {
    return this.core.fetch('/jobmaterial.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Material
   * @throws FetchError<400, types.CreateJobMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobMaterialsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobMaterials(body: types.CreateJobMaterialsBodyParam): Promise<FetchResponse<200, types.CreateJobMaterialsResponse200>> {
    return this.core.fetch('/jobmaterial.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_materials**.
   *
   * @summary Retrieve a Job Material
   * @throws FetchError<400, types.GetJobMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobMaterialsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobMaterialsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobMaterials(metadata: types.GetJobMaterialsMetadataParam): Promise<FetchResponse<200, types.GetJobMaterialsResponse200>> {
    return this.core.fetch('/jobmaterial/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * @summary Update a Job Material
   * @throws FetchError<400, types.UpdateJobMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobMaterialsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobMaterialsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobMaterials(body: types.UpdateJobMaterialsBodyParam, metadata: types.UpdateJobMaterialsMetadataParam): Promise<FetchResponse<200, types.UpdateJobMaterialsResponse200>> {
    return this.core.fetch('/jobmaterial/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * @summary Delete a Job Material
   * @throws FetchError<400, types.DeleteJobMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobMaterialsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobMaterialsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobMaterials(metadata: types.DeleteJobMaterialsMetadataParam): Promise<FetchResponse<200, types.DeleteJobMaterialsResponse200>> {
    return this.core.fetch('/jobmaterial/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_materials**.
   *
   * @summary List all Job Material Bundles
   * @throws FetchError<400, types.ListJobMaterialBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobMaterialBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobMaterialBundlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobMaterialBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobMaterialBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobMaterialBundles(): Promise<FetchResponse<200, types.ListJobMaterialBundlesResponse200>> {
    return this.core.fetch('/jobmaterialbundle.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Material Bundle
   * @throws FetchError<400, types.CreateJobMaterialBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobMaterialBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobMaterialBundlesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobMaterialBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobMaterialBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobMaterialBundles(body: types.CreateJobMaterialBundlesBodyParam): Promise<FetchResponse<200, types.CreateJobMaterialBundlesResponse200>> {
    return this.core.fetch('/jobmaterialbundle.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_materials**.
   *
   * @summary Retrieve a Job Material Bundle
   * @throws FetchError<400, types.GetJobMaterialBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobMaterialBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobMaterialBundlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobMaterialBundlesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobMaterialBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobMaterialBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobMaterialBundles(metadata: types.GetJobMaterialBundlesMetadataParam): Promise<FetchResponse<200, types.GetJobMaterialBundlesResponse200>> {
    return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * @summary Update a Job Material Bundle
   * @throws FetchError<400, types.UpdateJobMaterialBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobMaterialBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobMaterialBundlesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobMaterialBundlesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobMaterialBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobMaterialBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobMaterialBundles(body: types.UpdateJobMaterialBundlesBodyParam, metadata: types.UpdateJobMaterialBundlesMetadataParam): Promise<FetchResponse<200, types.UpdateJobMaterialBundlesResponse200>> {
    return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_materials**.
   *
   * @summary Delete a Job Material Bundle
   * @throws FetchError<400, types.DeleteJobMaterialBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobMaterialBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobMaterialBundlesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobMaterialBundlesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobMaterialBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobMaterialBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobMaterialBundles(metadata: types.DeleteJobMaterialBundlesMetadataParam): Promise<FetchResponse<200, types.DeleteJobMaterialBundlesResponse200>> {
    return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_payments**.
   *
   * @summary List all Job Payments
   * @throws FetchError<400, types.ListJobPaymentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobPaymentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobPaymentsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobPaymentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobPaymentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobPayments(): Promise<FetchResponse<200, types.ListJobPaymentsResponse200>> {
    return this.core.fetch('/jobpayment.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_payments**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Payment
   * @throws FetchError<400, types.CreateJobPaymentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobPaymentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobPaymentsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobPaymentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobPaymentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobPayments(body: types.CreateJobPaymentsBodyParam): Promise<FetchResponse<200, types.CreateJobPaymentsResponse200>> {
    return this.core.fetch('/jobpayment.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_payments**.
   *
   * @summary Retrieve a Job Payment
   * @throws FetchError<400, types.GetJobPaymentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobPaymentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobPaymentsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobPaymentsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobPaymentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobPaymentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobPayments(metadata: types.GetJobPaymentsMetadataParam): Promise<FetchResponse<200, types.GetJobPaymentsResponse200>> {
    return this.core.fetch('/jobpayment/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_payments**.
   *
   * @summary Update a Job Payment
   * @throws FetchError<400, types.UpdateJobPaymentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobPaymentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobPaymentsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobPaymentsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobPaymentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobPaymentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobPayments(body: types.UpdateJobPaymentsBodyParam, metadata: types.UpdateJobPaymentsMetadataParam): Promise<FetchResponse<200, types.UpdateJobPaymentsResponse200>> {
    return this.core.fetch('/jobpayment/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_payments**.
   *
   * @summary Delete a Job Payment
   * @throws FetchError<400, types.DeleteJobPaymentsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobPaymentsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobPaymentsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobPaymentsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobPaymentsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobPaymentsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobPayments(metadata: types.DeleteJobPaymentsMetadataParam): Promise<FetchResponse<200, types.DeleteJobPaymentsResponse200>> {
    return this.core.fetch('/jobpayment/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_jobs**.
   *
   * @summary List all Job Templates
   * @throws FetchError<400, types.ListJobTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobTemplates(): Promise<FetchResponse<200, types.ListJobTemplatesResponse200>> {
    return this.core.fetch('/jobtemplate.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_jobs**.
   *
   * @summary Retrieve a Job Template
   * @throws FetchError<400, types.GetJobTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobTemplatesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobTemplates(metadata: types.GetJobTemplatesMetadataParam): Promise<FetchResponse<200, types.GetJobTemplatesResponse200>> {
    return this.core.fetch('/jobtemplate/{uuid}.json', 'get', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_knowledge**.
   *
   * @summary List all Knowledge Articles
   * @throws FetchError<400, types.ListKnowledgeArticlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListKnowledgeArticlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListKnowledgeArticlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListKnowledgeArticlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListKnowledgeArticlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listKnowledgeArticles(): Promise<FetchResponse<200, types.ListKnowledgeArticlesResponse200>> {
    return this.core.fetch('/knowledgearticle.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_knowledge**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Knowledge Article
   * @throws FetchError<400, types.CreateKnowledgeArticlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateKnowledgeArticlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateKnowledgeArticlesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateKnowledgeArticlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateKnowledgeArticlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createKnowledgeArticles(body: types.CreateKnowledgeArticlesBodyParam): Promise<FetchResponse<200, types.CreateKnowledgeArticlesResponse200>> {
    return this.core.fetch('/knowledgearticle.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_knowledge**.
   *
   * @summary Retrieve a Knowledge Article
   * @throws FetchError<400, types.GetKnowledgeArticlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetKnowledgeArticlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetKnowledgeArticlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetKnowledgeArticlesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetKnowledgeArticlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetKnowledgeArticlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getKnowledgeArticles(metadata: types.GetKnowledgeArticlesMetadataParam): Promise<FetchResponse<200, types.GetKnowledgeArticlesResponse200>> {
    return this.core.fetch('/knowledgearticle/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_knowledge**.
   *
   * @summary Update a Knowledge Article
   * @throws FetchError<400, types.UpdateKnowledgeArticlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateKnowledgeArticlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateKnowledgeArticlesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateKnowledgeArticlesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateKnowledgeArticlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateKnowledgeArticlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateKnowledgeArticles(body: types.UpdateKnowledgeArticlesBodyParam, metadata: types.UpdateKnowledgeArticlesMetadataParam): Promise<FetchResponse<200, types.UpdateKnowledgeArticlesResponse200>> {
    return this.core.fetch('/knowledgearticle/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_knowledge**.
   *
   * @summary Delete a Knowledge Article
   * @throws FetchError<400, types.DeleteKnowledgeArticlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteKnowledgeArticlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteKnowledgeArticlesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteKnowledgeArticlesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteKnowledgeArticlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteKnowledgeArticlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteKnowledgeArticles(metadata: types.DeleteKnowledgeArticlesMetadataParam): Promise<FetchResponse<200, types.DeleteKnowledgeArticlesResponse200>> {
    return this.core.fetch('/knowledgearticle/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_locations**.
   *
   * @summary List all Locations
   * @throws FetchError<400, types.ListLocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListLocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListLocationsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListLocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListLocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listLocations(): Promise<FetchResponse<200, types.ListLocationsResponse200>> {
    return this.core.fetch('/location.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_locations**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Location
   * @throws FetchError<400, types.CreateLocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateLocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateLocationsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateLocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateLocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createLocations(body: types.CreateLocationsBodyParam): Promise<FetchResponse<200, types.CreateLocationsResponse200>> {
    return this.core.fetch('/location.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_locations**.
   *
   * @summary Retrieve a Location
   * @throws FetchError<400, types.GetLocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetLocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetLocationsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetLocationsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetLocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetLocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getLocations(metadata: types.GetLocationsMetadataParam): Promise<FetchResponse<200, types.GetLocationsResponse200>> {
    return this.core.fetch('/location/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_locations**.
   *
   * @summary Update a Location
   * @throws FetchError<400, types.UpdateLocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateLocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateLocationsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateLocationsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateLocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateLocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateLocations(body: types.UpdateLocationsBodyParam, metadata: types.UpdateLocationsMetadataParam): Promise<FetchResponse<200, types.UpdateLocationsResponse200>> {
    return this.core.fetch('/location/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_locations**.
   *
   * @summary Delete a Location
   * @throws FetchError<400, types.DeleteLocationsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteLocationsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteLocationsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteLocationsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteLocationsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteLocationsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteLocations(metadata: types.DeleteLocationsMetadataParam): Promise<FetchResponse<200, types.DeleteLocationsResponse200>> {
    return this.core.fetch('/location/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_inventory**.
   *
   * @summary List all Materials
   * @throws FetchError<400, types.ListMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListMaterialsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listMaterials(): Promise<FetchResponse<200, types.ListMaterialsResponse200>> {
    return this.core.fetch('/material.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Material
   * @throws FetchError<400, types.CreateMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateMaterialsResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createMaterials(body: types.CreateMaterialsBodyParam): Promise<FetchResponse<200, types.CreateMaterialsResponse200>> {
    return this.core.fetch('/material.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_inventory**.
   *
   * @summary Retrieve a Material
   * @throws FetchError<400, types.GetMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetMaterialsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetMaterialsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getMaterials(metadata: types.GetMaterialsMetadataParam): Promise<FetchResponse<200, types.GetMaterialsResponse200>> {
    return this.core.fetch('/material/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * @summary Update a Material
   * @throws FetchError<400, types.UpdateMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateMaterialsResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateMaterialsResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateMaterials(body: types.UpdateMaterialsBodyParam, metadata: types.UpdateMaterialsMetadataParam): Promise<FetchResponse<200, types.UpdateMaterialsResponse200>> {
    return this.core.fetch('/material/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * @summary Delete a Material
   * @throws FetchError<400, types.DeleteMaterialsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteMaterialsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteMaterialsResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteMaterialsResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteMaterialsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteMaterialsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteMaterials(metadata: types.DeleteMaterialsMetadataParam): Promise<FetchResponse<200, types.DeleteMaterialsResponse200>> {
    return this.core.fetch('/material/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_inventory**.
   *
   * @summary List all Bundles
   * @throws FetchError<400, types.ListBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListBundlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listBundles(): Promise<FetchResponse<200, types.ListBundlesResponse200>> {
    return this.core.fetch('/materialbundle.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Bundle
   * @throws FetchError<400, types.CreateBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateBundlesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createBundles(body: types.CreateBundlesBodyParam): Promise<FetchResponse<200, types.CreateBundlesResponse200>> {
    return this.core.fetch('/materialbundle.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_inventory**.
   *
   * @summary Retrieve a Bundle
   * @throws FetchError<400, types.GetBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetBundlesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetBundlesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getBundles(metadata: types.GetBundlesMetadataParam): Promise<FetchResponse<200, types.GetBundlesResponse200>> {
    return this.core.fetch('/materialbundle/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * @summary Update a Bundle
   * @throws FetchError<400, types.UpdateBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateBundlesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateBundlesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateBundles(body: types.UpdateBundlesBodyParam, metadata: types.UpdateBundlesMetadataParam): Promise<FetchResponse<200, types.UpdateBundlesResponse200>> {
    return this.core.fetch('/materialbundle/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_inventory**.
   *
   * @summary Delete a Bundle
   * @throws FetchError<400, types.DeleteBundlesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteBundlesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteBundlesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteBundlesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteBundlesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteBundlesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteBundles(metadata: types.DeleteBundlesMetadataParam): Promise<FetchResponse<200, types.DeleteBundlesResponse200>> {
    return this.core.fetch('/materialbundle/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_notes**.
   *
   * @summary List all Notes
   * @throws FetchError<400, types.ListNotesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListNotesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListNotesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListNotesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListNotesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listNotes(): Promise<FetchResponse<200, types.ListNotesResponse200>> {
    return this.core.fetch('/note.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_job_notes**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Note
   * @throws FetchError<400, types.CreateNotesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateNotesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateNotesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateNotesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateNotesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createNotes(body: types.CreateNotesBodyParam): Promise<FetchResponse<200, types.CreateNotesResponse200>> {
    return this.core.fetch('/note.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_notes**.
   *
   * @summary Retrieve a Note
   * @throws FetchError<400, types.GetNotesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetNotesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetNotesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetNotesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetNotesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetNotesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getNotes(metadata: types.GetNotesMetadataParam): Promise<FetchResponse<200, types.GetNotesResponse200>> {
    return this.core.fetch('/dbonote/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_job_notes**.
   *
   * @summary Update a Note
   * @throws FetchError<400, types.UpdateNotesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateNotesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateNotesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateNotesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateNotesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateNotesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateNotes(body: types.UpdateNotesBodyParam, metadata: types.UpdateNotesMetadataParam): Promise<FetchResponse<200, types.UpdateNotesResponse200>> {
    return this.core.fetch('/dbonote/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_job_notes**.
   *
   * @summary Delete a Note
   * @throws FetchError<400, types.DeleteNotesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteNotesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteNotesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteNotesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteNotesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteNotesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteNotes(metadata: types.DeleteNotesMetadataParam): Promise<FetchResponse<200, types.DeleteNotesResponse200>> {
    return this.core.fetch('/dbonote/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_queues**.
   *
   * @summary List all Job Queues
   * @throws FetchError<400, types.ListJobQueuesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListJobQueuesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListJobQueuesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListJobQueuesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListJobQueuesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listJobQueues(): Promise<FetchResponse<200, types.ListJobQueuesResponse200>> {
    return this.core.fetch('/queue.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_queues**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Job Queue
   * @throws FetchError<400, types.CreateJobQueuesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateJobQueuesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateJobQueuesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateJobQueuesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateJobQueuesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createJobQueues(body: types.CreateJobQueuesBodyParam): Promise<FetchResponse<200, types.CreateJobQueuesResponse200>> {
    return this.core.fetch('/queue.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_job_queues**.
   *
   * @summary Retrieve a Job Queue
   * @throws FetchError<400, types.GetJobQueuesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetJobQueuesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetJobQueuesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetJobQueuesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetJobQueuesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetJobQueuesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getJobQueues(metadata: types.GetJobQueuesMetadataParam): Promise<FetchResponse<200, types.GetJobQueuesResponse200>> {
    return this.core.fetch('/queue/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_queues**.
   *
   * @summary Update a Job Queue
   * @throws FetchError<400, types.UpdateJobQueuesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateJobQueuesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateJobQueuesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateJobQueuesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateJobQueuesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateJobQueuesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateJobQueues(body: types.UpdateJobQueuesBodyParam, metadata: types.UpdateJobQueuesMetadataParam): Promise<FetchResponse<200, types.UpdateJobQueuesResponse200>> {
    return this.core.fetch('/queue/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_job_queues**.
   *
   * @summary Delete a Job Queue
   * @throws FetchError<400, types.DeleteJobQueuesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteJobQueuesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteJobQueuesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteJobQueuesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteJobQueuesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteJobQueuesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteJobQueues(metadata: types.DeleteJobQueuesMetadataParam): Promise<FetchResponse<200, types.DeleteJobQueuesResponse200>> {
    return this.core.fetch('/queue/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_security_roles**.
   *
   * @summary List all Security Roles
   * @throws FetchError<400, types.ListSecurityRolesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListSecurityRolesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListSecurityRolesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListSecurityRolesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListSecurityRolesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listSecurityRoles(): Promise<FetchResponse<200, types.ListSecurityRolesResponse200>> {
    return this.core.fetch('/securityrole.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_security_roles**.
   *
   * @summary Retrieve a Security Role
   * @throws FetchError<400, types.GetSecurityRolesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetSecurityRolesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetSecurityRolesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetSecurityRolesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetSecurityRolesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetSecurityRolesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getSecurityRoles(metadata: types.GetSecurityRolesMetadataParam): Promise<FetchResponse<200, types.GetSecurityRolesResponse200>> {
    return this.core.fetch('/securityrole/{uuid}.json', 'get', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary List all SMS Templates
   * @throws FetchError<400, types.ListSmsTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListSmsTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListSmsTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListSmsTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListSmsTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listSMSTemplates(): Promise<FetchResponse<200, types.ListSmsTemplatesResponse200>> {
    return this.core.fetch('/smstemplate.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new SMS Template
   * @throws FetchError<400, types.CreateSmsTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateSmsTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateSmsTemplatesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateSmsTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateSmsTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createSMSTemplates(body: types.CreateSmsTemplatesBodyParam): Promise<FetchResponse<200, types.CreateSmsTemplatesResponse200>> {
    return this.core.fetch('/smstemplate.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Retrieve a SMS Template
   * @throws FetchError<400, types.GetSmsTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetSmsTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetSmsTemplatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetSmsTemplatesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetSmsTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetSmsTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getSMSTemplates(metadata: types.GetSmsTemplatesMetadataParam): Promise<FetchResponse<200, types.GetSmsTemplatesResponse200>> {
    return this.core.fetch('/smstemplate/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Update a SMS Template
   * @throws FetchError<400, types.UpdateSmsTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateSmsTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateSmsTemplatesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateSmsTemplatesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateSmsTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateSmsTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateSMSTemplates(body: types.UpdateSmsTemplatesBodyParam, metadata: types.UpdateSmsTemplatesMetadataParam): Promise<FetchResponse<200, types.UpdateSmsTemplatesResponse200>> {
    return this.core.fetch('/smstemplate/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_templates**.
   *
   * @summary Delete a SMS Template
   * @throws FetchError<400, types.DeleteSmsTemplatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteSmsTemplatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteSmsTemplatesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteSmsTemplatesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteSmsTemplatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteSmsTemplatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteSMSTemplates(metadata: types.DeleteSmsTemplatesMetadataParam): Promise<FetchResponse<200, types.DeleteSmsTemplatesResponse200>> {
    return this.core.fetch('/smstemplate/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_staff**.
   *
   * @summary List all Staff Members
   * @throws FetchError<400, types.ListStaffMembersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListStaffMembersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListStaffMembersResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListStaffMembersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListStaffMembersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listStaffMembers(): Promise<FetchResponse<200, types.ListStaffMembersResponse200>> {
    return this.core.fetch('/staff.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_staff**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Staff Member
   * @throws FetchError<400, types.CreateStaffMembersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateStaffMembersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateStaffMembersResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateStaffMembersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateStaffMembersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createStaffMembers(body: types.CreateStaffMembersBodyParam): Promise<FetchResponse<200, types.CreateStaffMembersResponse200>> {
    return this.core.fetch('/staff.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_staff**.
   *
   * @summary Retrieve a Staff Member
   * @throws FetchError<400, types.GetStaffMembersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetStaffMembersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetStaffMembersResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetStaffMembersResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetStaffMembersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetStaffMembersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getStaffMembers(metadata: types.GetStaffMembersMetadataParam): Promise<FetchResponse<200, types.GetStaffMembersResponse200>> {
    return this.core.fetch('/staff/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_staff**.
   *
   * @summary Update a Staff Member
   * @throws FetchError<400, types.UpdateStaffMembersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateStaffMembersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateStaffMembersResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateStaffMembersResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateStaffMembersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateStaffMembersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateStaffMembers(body: types.UpdateStaffMembersBodyParam, metadata: types.UpdateStaffMembersMetadataParam): Promise<FetchResponse<200, types.UpdateStaffMembersResponse200>> {
    return this.core.fetch('/staff/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_staff**.
   *
   * @summary Delete a Staff Member
   * @throws FetchError<400, types.DeleteStaffMembersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteStaffMembersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteStaffMembersResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteStaffMembersResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteStaffMembersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteStaffMembersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteStaffMembers(metadata: types.DeleteStaffMembersMetadataParam): Promise<FetchResponse<200, types.DeleteStaffMembersResponse200>> {
    return this.core.fetch('/staff/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_messages**.
   *
   * @summary List all Staff Messages
   * @throws FetchError<400, types.ListStaffMessagesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListStaffMessagesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListStaffMessagesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListStaffMessagesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListStaffMessagesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listStaffMessages(): Promise<FetchResponse<200, types.ListStaffMessagesResponse200>> {
    return this.core.fetch('/staffmessage.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_messages**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Staff Message
   * @throws FetchError<400, types.CreateStaffMessagesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateStaffMessagesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateStaffMessagesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateStaffMessagesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateStaffMessagesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createStaffMessages(body: types.CreateStaffMessagesBodyParam): Promise<FetchResponse<200, types.CreateStaffMessagesResponse200>> {
    return this.core.fetch('/staffmessage.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_messages**.
   *
   * @summary Retrieve a Staff Message
   * @throws FetchError<400, types.GetStaffMessagesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetStaffMessagesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetStaffMessagesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetStaffMessagesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetStaffMessagesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetStaffMessagesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getStaffMessages(metadata: types.GetStaffMessagesMetadataParam): Promise<FetchResponse<200, types.GetStaffMessagesResponse200>> {
    return this.core.fetch('/staffmessage/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_messages**.
   *
   * @summary Update a Staff Message
   * @throws FetchError<400, types.UpdateStaffMessagesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateStaffMessagesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateStaffMessagesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateStaffMessagesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateStaffMessagesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateStaffMessagesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateStaffMessages(body: types.UpdateStaffMessagesBodyParam, metadata: types.UpdateStaffMessagesMetadataParam): Promise<FetchResponse<200, types.UpdateStaffMessagesResponse200>> {
    return this.core.fetch('/staffmessage/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **publish_messages**.
   *
   * @summary Delete a Staff Message
   * @throws FetchError<400, types.DeleteStaffMessagesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteStaffMessagesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteStaffMessagesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteStaffMessagesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteStaffMessagesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteStaffMessagesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteStaffMessages(metadata: types.DeleteStaffMessagesMetadataParam): Promise<FetchResponse<200, types.DeleteStaffMessagesResponse200>> {
    return this.core.fetch('/staffmessage/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_suppliers**.
   *
   * @summary List all Suppliers
   * @throws FetchError<400, types.ListSuppliersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListSuppliersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListSuppliersResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListSuppliersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListSuppliersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listSuppliers(): Promise<FetchResponse<200, types.ListSuppliersResponse200>> {
    return this.core.fetch('/supplier.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_suppliers**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Supplier
   * @throws FetchError<400, types.CreateSuppliersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateSuppliersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateSuppliersResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateSuppliersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateSuppliersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createSuppliers(body: types.CreateSuppliersBodyParam): Promise<FetchResponse<200, types.CreateSuppliersResponse200>> {
    return this.core.fetch('/supplier.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_suppliers**.
   *
   * @summary Retrieve a Supplier
   * @throws FetchError<400, types.GetSuppliersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetSuppliersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetSuppliersResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetSuppliersResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetSuppliersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetSuppliersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getSuppliers(metadata: types.GetSuppliersMetadataParam): Promise<FetchResponse<200, types.GetSuppliersResponse200>> {
    return this.core.fetch('/supplier/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_suppliers**.
   *
   * @summary Update a Supplier
   * @throws FetchError<400, types.UpdateSuppliersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateSuppliersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateSuppliersResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateSuppliersResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateSuppliersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateSuppliersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateSuppliers(body: types.UpdateSuppliersBodyParam, metadata: types.UpdateSuppliersMetadataParam): Promise<FetchResponse<200, types.UpdateSuppliersResponse200>> {
    return this.core.fetch('/supplier/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_suppliers**.
   *
   * @summary Delete a Supplier
   * @throws FetchError<400, types.DeleteSuppliersResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteSuppliersResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteSuppliersResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteSuppliersResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteSuppliersResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteSuppliersResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteSuppliers(metadata: types.DeleteSuppliersMetadataParam): Promise<FetchResponse<200, types.DeleteSuppliersResponse200>> {
    return this.core.fetch('/supplier/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_tasks**.
   *
   * @summary List all Tasks
   * @throws FetchError<400, types.ListTasksResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListTasksResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListTasksResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListTasksResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListTasksResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listTasks(): Promise<FetchResponse<200, types.ListTasksResponse200>> {
    return this.core.fetch('/task.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tasks**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Task
   * @throws FetchError<400, types.CreateTasksResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateTasksResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateTasksResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateTasksResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateTasksResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createTasks(body: types.CreateTasksBodyParam): Promise<FetchResponse<200, types.CreateTasksResponse200>> {
    return this.core.fetch('/task.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_tasks**.
   *
   * @summary Retrieve a Task
   * @throws FetchError<400, types.GetTasksResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetTasksResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetTasksResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetTasksResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetTasksResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetTasksResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getTasks(metadata: types.GetTasksMetadataParam): Promise<FetchResponse<200, types.GetTasksResponse200>> {
    return this.core.fetch('/task/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tasks**.
   *
   * @summary Update a Task
   * @throws FetchError<400, types.UpdateTasksResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateTasksResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateTasksResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateTasksResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateTasksResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateTasksResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateTasks(body: types.UpdateTasksBodyParam, metadata: types.UpdateTasksMetadataParam): Promise<FetchResponse<200, types.UpdateTasksResponse200>> {
    return this.core.fetch('/task/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tasks**.
   *
   * @summary Delete a Task
   * @throws FetchError<400, types.DeleteTasksResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteTasksResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteTasksResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteTasksResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteTasksResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteTasksResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteTasks(metadata: types.DeleteTasksMetadataParam): Promise<FetchResponse<200, types.DeleteTasksResponse200>> {
    return this.core.fetch('/task/{uuid}.json', 'delete', metadata);
  }

  /**
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_tax_rates**.
   *
   * @summary List all Tax Rates
   * @throws FetchError<400, types.ListTaxRatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListTaxRatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListTaxRatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListTaxRatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListTaxRatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listTaxRates(): Promise<FetchResponse<200, types.ListTaxRatesResponse200>> {
    return this.core.fetch('/taxrate.json', 'get');
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tax_rates**.
   *
   * 			
   * 			
   * #### Record UUID
   * UUID is optional for record creation. If no UUID is supplied, a UUID will be
   * automatically generated for the new record and returned in the `x-record-uuid` response
   * header.
   *
   * @summary Create a new Tax Rate
   * @throws FetchError<400, types.CreateTaxRatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.CreateTaxRatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.CreateTaxRatesResponse403> Forbidden - You don't have permission to create this resource
   * @throws FetchError<429, types.CreateTaxRatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.CreateTaxRatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  createTaxRates(body: types.CreateTaxRatesBodyParam): Promise<FetchResponse<200, types.CreateTaxRatesResponse200>> {
    return this.core.fetch('/taxrate.json', 'post', body);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **read_tax_rates**.
   *
   * @summary Retrieve a Tax Rate
   * @throws FetchError<400, types.GetTaxRatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetTaxRatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetTaxRatesResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetTaxRatesResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetTaxRatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetTaxRatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getTaxRates(metadata: types.GetTaxRatesMetadataParam): Promise<FetchResponse<200, types.GetTaxRatesResponse200>> {
    return this.core.fetch('/taxrate/{uuid}.json', 'get', metadata);
  }

  /**
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tax_rates**.
   *
   * @summary Update a Tax Rate
   * @throws FetchError<400, types.UpdateTaxRatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.UpdateTaxRatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.UpdateTaxRatesResponse403> Forbidden - You don't have permission to update this resource
   * @throws FetchError<404, types.UpdateTaxRatesResponse404> Not Found - The record to update does not exist or has been deleted
   * @throws FetchError<429, types.UpdateTaxRatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.UpdateTaxRatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  updateTaxRates(body: types.UpdateTaxRatesBodyParam, metadata: types.UpdateTaxRatesMetadataParam): Promise<FetchResponse<200, types.UpdateTaxRatesResponse200>> {
    return this.core.fetch('/taxrate/{uuid}.json', 'post', body, metadata);
  }

  /**
   * In ServiceM8, deleting a record sets its `active` field to `0`. Inactive records are
   * still accessible on the API, but are hidden in the UI. Inactive records can be restored
   * by setting their `active` field to `1`.
   *
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **manage_tax_rates**.
   *
   * @summary Delete a Tax Rate
   * @throws FetchError<400, types.DeleteTaxRatesResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.DeleteTaxRatesResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.DeleteTaxRatesResponse403> Forbidden - You don't have permission to delete this resource
   * @throws FetchError<404, types.DeleteTaxRatesResponse404> Not Found - The record to delete does not exist or has already been deleted
   * @throws FetchError<429, types.DeleteTaxRatesResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.DeleteTaxRatesResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  deleteTaxRates(metadata: types.DeleteTaxRatesMetadataParam): Promise<FetchResponse<200, types.DeleteTaxRatesResponse200>> {
    return this.core.fetch('/taxrate/{uuid}.json', 'delete', metadata);
  }

  /**
   * Vendor account information
   *
   *
   * 			
   * #### Filtering
   * This endpoint supports result filtering. For more information on how to filter this
   * request, [go here](/docs/filtering).
   * 			
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **vendor**.
   *
   * @summary List all Vendors
   * @throws FetchError<400, types.ListVendorsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.ListVendorsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.ListVendorsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<429, types.ListVendorsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.ListVendorsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  listVendors(): Promise<FetchResponse<200, types.ListVendorsResponse200>> {
    return this.core.fetch('/vendor.json', 'get');
  }

  /**
   * Vendor account information
   *
   *
   * 			
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **vendor**.
   *
   * @summary Retrieve a Vendor
   * @throws FetchError<400, types.GetVendorsResponse400> Bad Request - The request is malformed or contains invalid parameters
   * @throws FetchError<401, types.GetVendorsResponse401> Unauthorized - Authentication credentials are missing or invalid
   * @throws FetchError<403, types.GetVendorsResponse403> Forbidden - You don't have permission to access this resource
   * @throws FetchError<404, types.GetVendorsResponse404> Not Found - The requested record does not exist or has been deleted
   * @throws FetchError<429, types.GetVendorsResponse429> Too Many Requests - You have exceeded the rate limit
   * @throws FetchError<500, types.GetVendorsResponse500> Internal Server Error - An unexpected error occurred on the server
   */
  getVendors(metadata: types.GetVendorsMetadataParam): Promise<FetchResponse<200, types.GetVendorsResponse200>> {
    return this.core.fetch('/vendor/{uuid}.json', 'get', metadata);
  }

  /**
   * Creates a new job by cloning an existing job template. All template entities (tasks,
   * materials, checklists, quotes, custom fields) are cloned to the new job.
   *
   * #### Field Overrides
   * Only the following fields can be overridden when creating a job from a template:
   * - `job_description` - Job description
   * - `company_uuid` - UUID of the company/client
   * - `company_name` - Name of the company/client (will lookup existing or create new)
   * - `job_address` - Street address for the job
   *
   * **Note:** You cannot specify both `company_uuid` and `company_name`. If `company_name`
   * is provided, the system will first search for an existing company with that name. If
   * found, it will use that company's UUID. If not found, a new company will be created.
   *
   * Any other fields in the request body will be ignored.
   *
   * #### OAuth Scope
   * This endpoint requires the following OAuth scope **create_jobs**.
   *
   * @summary Create a job from a template
   * @throws FetchError<400, types.CreateJobFromTemplateResponse400> Bad request - Invalid input data
   * @throws FetchError<403, types.CreateJobFromTemplateResponse403> Forbidden - Missing required OAuth scope
   * @throws FetchError<404, types.CreateJobFromTemplateResponse404> Not Found - Template UUID not found or inactive
   * @throws FetchError<405, types.CreateJobFromTemplateResponse405> Method Not Allowed
   * @throws FetchError<500, types.CreateJobFromTemplateResponse500> Internal Server Error
   */
  createJobFromTemplate(body: types.CreateJobFromTemplateBodyParam, metadata: types.CreateJobFromTemplateMetadataParam): Promise<FetchResponse<201, types.CreateJobFromTemplateResponse201>> {
    return this.core.fetch('/jobtemplate/{uuid}/job.json', 'post', body, metadata);
  }

  /**
   * Performs a text search across jobs, companies, and materials. Returns combined results
   * sorted by relevance.
   *
   * @summary Search across multiple object types
   * @throws FetchError<400, types.GeneralSearchResponse400> Bad request - Missing query parameter
   * @throws FetchError<500, types.GeneralSearchResponse500> Internal server error
   */
  generalSearch(metadata: types.GeneralSearchMetadataParam): Promise<FetchResponse<200, types.GeneralSearchResponse200>> {
    return this.core.fetch('/search.json', 'get', metadata);
  }

  /**
   * Performs a text search within a specific object type. Supported types: job, company,
   * material, knowledgearticle, attachment, formresponse, asset, materialbundle
   *
   * @summary Search within a specific object type
   * @throws FetchError<400, types.ObjectSearchResponse400> Bad request
   * @throws FetchError<429, types.ObjectSearchResponse429> Too many requests - Search throttled
   * @throws FetchError<500, types.ObjectSearchResponse500> Internal server error
   */
  objectSearch(metadata: types.ObjectSearchMetadataParam): Promise<FetchResponse<200, types.ObjectSearchResponse200>> {
    return this.core.fetch('/search/{objectType}.json', 'get', metadata);
  }

  /**
   * Harness the power of advanced AI embeddings to revolutionise how you search through job
   * data. This endpoint transforms your search query into high-dimensional vector
   * embeddings, then intelligently matches it against our entire job database using semantic
   * similarity algorithms.
   *
   * How it works:
   * 1. AI Query Understanding - Your search terms are processed through neural embedding
   * models that understand context, intent, and meaning
   * 2. Vector-Based Matching - The system compares your query against vector representations
   * of all job content in real-time
   * 3. Intelligent Ranking - Returns results ranked by semantic similarity, not just keyword
   * matching
   *
   * Why this matters:
   * - Find jobs about "plumbing repairs" even when searching for "fixing pipes"
   * - Discover relevant work orders that use different terminology but share the same intent
   * - Uncover hidden patterns and connections in your job data that traditional search would
   * miss
   *
   * This isn't just search—it's AI that truly understands what you're looking for and
   * delivers the most relevant results, even when the exact words don't match.
   *
   * @summary Semantic search for jobs
   * @throws FetchError<400, types.JobEmbeddingSearchResponse400> Bad request
   * @throws FetchError<500, types.JobEmbeddingSearchResponse500> Internal server error
   * @throws FetchError<503, types.JobEmbeddingSearchResponse503> Service unavailable - Embedding search not available
   */
  jobEmbeddingSearch(metadata: types.JobEmbeddingSearchMetadataParam): Promise<FetchResponse<200, types.JobEmbeddingSearchResponse200>> {
    return this.core.fetch('/search/job/embedding.json', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of inbox messages with optional filtering
   *
   * @summary List inbox messages
   * @throws FetchError<400, types.ListInboxMessagesResponse400> Service Unavailable - Inbox not enabled
   * @throws FetchError<403, types.ListInboxMessagesResponse403> Forbidden - Missing permission or OAuth scope
   */
  listInboxMessages(metadata?: types.ListInboxMessagesMetadataParam): Promise<FetchResponse<200, types.ListInboxMessagesResponse200>> {
    return this.core.fetch('/inboxmessage.json', 'get', metadata);
  }

  /**
   * Creates a new inbox message that will appear in the inbox
   *
   * @summary Create a new inbox message
   * @throws FetchError<400, types.CreateInboxMessageResponse400> Bad request - Invalid input
   * @throws FetchError<403, types.CreateInboxMessageResponse403> Forbidden - Missing permission or OAuth scope
   * @throws FetchError<404, types.CreateInboxMessageResponse404> Not found - Related entity not found
   * @throws FetchError<500, types.CreateInboxMessageResponse500> Internal server error
   */
  createInboxMessage(body: types.CreateInboxMessageBodyParam): Promise<FetchResponse<201, types.CreateInboxMessageResponse201>> {
    return this.core.fetch('/inboxmessage.json', 'post', body);
  }

  /**
   * Retrieves detailed information about a specific inbox message including attachments and
   * conversation history
   *
   * @summary Get inbox message details
   * @throws FetchError<404, types.GetInboxMessageResponse404> Message not found
   */
  getInboxMessage(metadata: types.GetInboxMessageMetadataParam): Promise<FetchResponse<200, types.GetInboxMessageResponse200>> {
    return this.core.fetch('/inboxmessage/{uuid}.json', 'get', metadata);
  }

  /**
   * Marks an inbox message as read
   *
   * @summary Mark message as read
   * @throws FetchError<404, types.MarkInboxMessageAsReadResponse404> Message not found
   */
  markInboxMessageAsRead(metadata: types.MarkInboxMessageAsReadMetadataParam): Promise<FetchResponse<200, types.MarkInboxMessageAsReadResponse200>> {
    return this.core.fetch('/inboxmessage/{uuid}/read.json', 'put', metadata);
  }

  /**
   * Archives or unarchives an inbox message
   *
   * @summary Archive or unarchive message
   */
  archiveInboxMessage(body: types.ArchiveInboxMessageBodyParam, metadata: types.ArchiveInboxMessageMetadataParam): Promise<FetchResponse<200, types.ArchiveInboxMessageResponse200>> {
    return this.core.fetch('/inboxmessage/{uuid}/archive.json', 'put', body, metadata);
  }

  /**
   * Snoozes a message until a specified date/time or unsnoozes it
   *
   * @summary Snooze or unsnooze message
   * @throws FetchError<400, types.SnoozeInboxMessageResponse400> Bad request - Invalid snooze date
   */
  snoozeInboxMessage(body: types.SnoozeInboxMessageBodyParam, metadata: types.SnoozeInboxMessageMetadataParam): Promise<FetchResponse<200, types.SnoozeInboxMessageResponse200>> {
    return this.core.fetch('/inboxmessage/{uuid}/snooze.json', 'put', body, metadata);
  }

  /**
   * Converts an inbox message into a new job, optionally using a job template
   *
   * @summary Convert message to job
   */
  convertInboxMessageToJob(body: types.ConvertInboxMessageToJobBodyParam, metadata: types.ConvertInboxMessageToJobMetadataParam): Promise<FetchResponse<201, types.ConvertInboxMessageToJobResponse201>> {
    return this.core.fetch('/inboxmessage/{uuid}/convert-to-job.json', 'post', body, metadata);
  }

  /**
   * Attaches an inbox message to an existing job
   *
   * @summary Attach message to existing job
   * @throws FetchError<404, types.AttachInboxMessageToJobResponse404> Job not found
   */
  attachInboxMessageToJob(body: types.AttachInboxMessageToJobBodyParam, metadata: types.AttachInboxMessageToJobMetadataParam): Promise<FetchResponse<200, types.AttachInboxMessageToJobResponse200>> {
    return this.core.fetch('/inboxmessage/{uuid}/attach-to-job.json', 'post', body, metadata);
  }

  /**
   * Adds a note to an inbox message
   *
   * @summary Add note to message
   * @throws FetchError<400, types.AddNoteToInboxMessageResponse400> Bad request - Empty note
   */
  addNoteToInboxMessage(body: types.AddNoteToInboxMessageBodyParam, metadata: types.AddNoteToInboxMessageMetadataParam): Promise<FetchResponse<201, types.AddNoteToInboxMessageResponse201>> {
    return this.core.fetch('/inboxmessage/{uuid}/notes.json', 'post', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AddNoteToInboxMessageBodyParam, AddNoteToInboxMessageMetadataParam, AddNoteToInboxMessageResponse201, AddNoteToInboxMessageResponse400, ArchiveInboxMessageBodyParam, ArchiveInboxMessageMetadataParam, ArchiveInboxMessageResponse200, AttachInboxMessageToJobBodyParam, AttachInboxMessageToJobMetadataParam, AttachInboxMessageToJobResponse200, AttachInboxMessageToJobResponse404, ConvertInboxMessageToJobBodyParam, ConvertInboxMessageToJobMetadataParam, ConvertInboxMessageToJobResponse201, CreateAllocationWindowsBodyParam, CreateAllocationWindowsResponse200, CreateAllocationWindowsResponse400, CreateAllocationWindowsResponse401, CreateAllocationWindowsResponse403, CreateAllocationWindowsResponse429, CreateAllocationWindowsResponse500, CreateAssetTypeFieldsBodyParam, CreateAssetTypeFieldsResponse200, CreateAssetTypeFieldsResponse400, CreateAssetTypeFieldsResponse401, CreateAssetTypeFieldsResponse403, CreateAssetTypeFieldsResponse429, CreateAssetTypeFieldsResponse500, CreateAssetTypesBodyParam, CreateAssetTypesResponse200, CreateAssetTypesResponse400, CreateAssetTypesResponse401, CreateAssetTypesResponse403, CreateAssetTypesResponse429, CreateAssetTypesResponse500, CreateAttachmentsBodyParam, CreateAttachmentsResponse200, CreateAttachmentsResponse400, CreateAttachmentsResponse401, CreateAttachmentsResponse403, CreateAttachmentsResponse429, CreateAttachmentsResponse500, CreateBadgesBodyParam, CreateBadgesResponse200, CreateBadgesResponse400, CreateBadgesResponse401, CreateBadgesResponse403, CreateBadgesResponse429, CreateBadgesResponse500, CreateBundlesBodyParam, CreateBundlesResponse200, CreateBundlesResponse400, CreateBundlesResponse401, CreateBundlesResponse403, CreateBundlesResponse429, CreateBundlesResponse500, CreateCategoriesBodyParam, CreateCategoriesResponse200, CreateCategoriesResponse400, CreateCategoriesResponse401, CreateCategoriesResponse403, CreateCategoriesResponse429, CreateCategoriesResponse500, CreateClientsBodyParam, CreateClientsResponse200, CreateClientsResponse400, CreateClientsResponse401, CreateClientsResponse403, CreateClientsResponse429, CreateClientsResponse500, CreateCompanyContactsBodyParam, CreateCompanyContactsResponse200, CreateCompanyContactsResponse400, CreateCompanyContactsResponse401, CreateCompanyContactsResponse403, CreateCompanyContactsResponse429, CreateCompanyContactsResponse500, CreateDocumentTemplatesBodyParam, CreateDocumentTemplatesResponse200, CreateDocumentTemplatesResponse400, CreateDocumentTemplatesResponse401, CreateDocumentTemplatesResponse403, CreateDocumentTemplatesResponse429, CreateDocumentTemplatesResponse500, CreateEmailTemplatesBodyParam, CreateEmailTemplatesResponse200, CreateEmailTemplatesResponse400, CreateEmailTemplatesResponse401, CreateEmailTemplatesResponse403, CreateEmailTemplatesResponse429, CreateEmailTemplatesResponse500, CreateFeedbackBodyParam, CreateFeedbackResponse200, CreateFeedbackResponse400, CreateFeedbackResponse401, CreateFeedbackResponse403, CreateFeedbackResponse429, CreateFeedbackResponse500, CreateFormFieldsBodyParam, CreateFormFieldsResponse200, CreateFormFieldsResponse400, CreateFormFieldsResponse401, CreateFormFieldsResponse403, CreateFormFieldsResponse429, CreateFormFieldsResponse500, CreateFormResponsesBodyParam, CreateFormResponsesResponse200, CreateFormResponsesResponse400, CreateFormResponsesResponse401, CreateFormResponsesResponse403, CreateFormResponsesResponse429, CreateFormResponsesResponse500, CreateFormsBodyParam, CreateFormsResponse200, CreateFormsResponse400, CreateFormsResponse401, CreateFormsResponse403, CreateFormsResponse429, CreateFormsResponse500, CreateInboxMessageBodyParam, CreateInboxMessageResponse201, CreateInboxMessageResponse400, CreateInboxMessageResponse403, CreateInboxMessageResponse404, CreateInboxMessageResponse500, CreateJobActivitiesBodyParam, CreateJobActivitiesResponse200, CreateJobActivitiesResponse400, CreateJobActivitiesResponse401, CreateJobActivitiesResponse403, CreateJobActivitiesResponse429, CreateJobActivitiesResponse500, CreateJobAllocationsBodyParam, CreateJobAllocationsResponse200, CreateJobAllocationsResponse400, CreateJobAllocationsResponse401, CreateJobAllocationsResponse403, CreateJobAllocationsResponse429, CreateJobAllocationsResponse500, CreateJobChecklistsBodyParam, CreateJobChecklistsResponse200, CreateJobChecklistsResponse400, CreateJobChecklistsResponse401, CreateJobChecklistsResponse403, CreateJobChecklistsResponse429, CreateJobChecklistsResponse500, CreateJobContactsBodyParam, CreateJobContactsResponse200, CreateJobContactsResponse400, CreateJobContactsResponse401, CreateJobContactsResponse403, CreateJobContactsResponse429, CreateJobContactsResponse500, CreateJobFromTemplateBodyParam, CreateJobFromTemplateMetadataParam, CreateJobFromTemplateResponse201, CreateJobFromTemplateResponse400, CreateJobFromTemplateResponse403, CreateJobFromTemplateResponse404, CreateJobFromTemplateResponse405, CreateJobFromTemplateResponse500, CreateJobMaterialBundlesBodyParam, CreateJobMaterialBundlesResponse200, CreateJobMaterialBundlesResponse400, CreateJobMaterialBundlesResponse401, CreateJobMaterialBundlesResponse403, CreateJobMaterialBundlesResponse429, CreateJobMaterialBundlesResponse500, CreateJobMaterialsBodyParam, CreateJobMaterialsResponse200, CreateJobMaterialsResponse400, CreateJobMaterialsResponse401, CreateJobMaterialsResponse403, CreateJobMaterialsResponse429, CreateJobMaterialsResponse500, CreateJobPaymentsBodyParam, CreateJobPaymentsResponse200, CreateJobPaymentsResponse400, CreateJobPaymentsResponse401, CreateJobPaymentsResponse403, CreateJobPaymentsResponse429, CreateJobPaymentsResponse500, CreateJobQueuesBodyParam, CreateJobQueuesResponse200, CreateJobQueuesResponse400, CreateJobQueuesResponse401, CreateJobQueuesResponse403, CreateJobQueuesResponse429, CreateJobQueuesResponse500, CreateJobsBodyParam, CreateJobsResponse200, CreateJobsResponse400, CreateJobsResponse401, CreateJobsResponse403, CreateJobsResponse429, CreateJobsResponse500, CreateKnowledgeArticlesBodyParam, CreateKnowledgeArticlesResponse200, CreateKnowledgeArticlesResponse400, CreateKnowledgeArticlesResponse401, CreateKnowledgeArticlesResponse403, CreateKnowledgeArticlesResponse429, CreateKnowledgeArticlesResponse500, CreateLocationsBodyParam, CreateLocationsResponse200, CreateLocationsResponse400, CreateLocationsResponse401, CreateLocationsResponse403, CreateLocationsResponse429, CreateLocationsResponse500, CreateMaterialsBodyParam, CreateMaterialsResponse200, CreateMaterialsResponse400, CreateMaterialsResponse401, CreateMaterialsResponse403, CreateMaterialsResponse429, CreateMaterialsResponse500, CreateNotesBodyParam, CreateNotesResponse200, CreateNotesResponse400, CreateNotesResponse401, CreateNotesResponse403, CreateNotesResponse429, CreateNotesResponse500, CreateSmsTemplatesBodyParam, CreateSmsTemplatesResponse200, CreateSmsTemplatesResponse400, CreateSmsTemplatesResponse401, CreateSmsTemplatesResponse403, CreateSmsTemplatesResponse429, CreateSmsTemplatesResponse500, CreateStaffMembersBodyParam, CreateStaffMembersResponse200, CreateStaffMembersResponse400, CreateStaffMembersResponse401, CreateStaffMembersResponse403, CreateStaffMembersResponse429, CreateStaffMembersResponse500, CreateStaffMessagesBodyParam, CreateStaffMessagesResponse200, CreateStaffMessagesResponse400, CreateStaffMessagesResponse401, CreateStaffMessagesResponse403, CreateStaffMessagesResponse429, CreateStaffMessagesResponse500, CreateSuppliersBodyParam, CreateSuppliersResponse200, CreateSuppliersResponse400, CreateSuppliersResponse401, CreateSuppliersResponse403, CreateSuppliersResponse429, CreateSuppliersResponse500, CreateTasksBodyParam, CreateTasksResponse200, CreateTasksResponse400, CreateTasksResponse401, CreateTasksResponse403, CreateTasksResponse429, CreateTasksResponse500, CreateTaxRatesBodyParam, CreateTaxRatesResponse200, CreateTaxRatesResponse400, CreateTaxRatesResponse401, CreateTaxRatesResponse403, CreateTaxRatesResponse429, CreateTaxRatesResponse500, DeleteAllocationWindowsMetadataParam, DeleteAllocationWindowsResponse200, DeleteAllocationWindowsResponse400, DeleteAllocationWindowsResponse401, DeleteAllocationWindowsResponse403, DeleteAllocationWindowsResponse404, DeleteAllocationWindowsResponse429, DeleteAllocationWindowsResponse500, DeleteAssetTypeFieldsMetadataParam, DeleteAssetTypeFieldsResponse200, DeleteAssetTypeFieldsResponse400, DeleteAssetTypeFieldsResponse401, DeleteAssetTypeFieldsResponse403, DeleteAssetTypeFieldsResponse404, DeleteAssetTypeFieldsResponse429, DeleteAssetTypeFieldsResponse500, DeleteAssetTypesMetadataParam, DeleteAssetTypesResponse200, DeleteAssetTypesResponse400, DeleteAssetTypesResponse401, DeleteAssetTypesResponse403, DeleteAssetTypesResponse404, DeleteAssetTypesResponse429, DeleteAssetTypesResponse500, DeleteAssetsMetadataParam, DeleteAssetsResponse200, DeleteAssetsResponse400, DeleteAssetsResponse401, DeleteAssetsResponse403, DeleteAssetsResponse404, DeleteAssetsResponse429, DeleteAssetsResponse500, DeleteAttachmentsMetadataParam, DeleteAttachmentsResponse200, DeleteAttachmentsResponse400, DeleteAttachmentsResponse401, DeleteAttachmentsResponse403, DeleteAttachmentsResponse404, DeleteAttachmentsResponse429, DeleteAttachmentsResponse500, DeleteBadgesMetadataParam, DeleteBadgesResponse200, DeleteBadgesResponse400, DeleteBadgesResponse401, DeleteBadgesResponse403, DeleteBadgesResponse404, DeleteBadgesResponse429, DeleteBadgesResponse500, DeleteBundlesMetadataParam, DeleteBundlesResponse200, DeleteBundlesResponse400, DeleteBundlesResponse401, DeleteBundlesResponse403, DeleteBundlesResponse404, DeleteBundlesResponse429, DeleteBundlesResponse500, DeleteCategoriesMetadataParam, DeleteCategoriesResponse200, DeleteCategoriesResponse400, DeleteCategoriesResponse401, DeleteCategoriesResponse403, DeleteCategoriesResponse404, DeleteCategoriesResponse429, DeleteCategoriesResponse500, DeleteClientsMetadataParam, DeleteClientsResponse200, DeleteClientsResponse400, DeleteClientsResponse401, DeleteClientsResponse403, DeleteClientsResponse404, DeleteClientsResponse429, DeleteClientsResponse500, DeleteCompanyContactsMetadataParam, DeleteCompanyContactsResponse200, DeleteCompanyContactsResponse400, DeleteCompanyContactsResponse401, DeleteCompanyContactsResponse403, DeleteCompanyContactsResponse404, DeleteCompanyContactsResponse429, DeleteCompanyContactsResponse500, DeleteDocumentTemplatesMetadataParam, DeleteDocumentTemplatesResponse200, DeleteDocumentTemplatesResponse400, DeleteDocumentTemplatesResponse401, DeleteDocumentTemplatesResponse403, DeleteDocumentTemplatesResponse404, DeleteDocumentTemplatesResponse429, DeleteDocumentTemplatesResponse500, DeleteEmailTemplatesMetadataParam, DeleteEmailTemplatesResponse200, DeleteEmailTemplatesResponse400, DeleteEmailTemplatesResponse401, DeleteEmailTemplatesResponse403, DeleteEmailTemplatesResponse404, DeleteEmailTemplatesResponse429, DeleteEmailTemplatesResponse500, DeleteFeedbackMetadataParam, DeleteFeedbackResponse200, DeleteFeedbackResponse400, DeleteFeedbackResponse401, DeleteFeedbackResponse403, DeleteFeedbackResponse404, DeleteFeedbackResponse429, DeleteFeedbackResponse500, DeleteFormFieldsMetadataParam, DeleteFormFieldsResponse200, DeleteFormFieldsResponse400, DeleteFormFieldsResponse401, DeleteFormFieldsResponse403, DeleteFormFieldsResponse404, DeleteFormFieldsResponse429, DeleteFormFieldsResponse500, DeleteFormResponsesMetadataParam, DeleteFormResponsesResponse200, DeleteFormResponsesResponse400, DeleteFormResponsesResponse401, DeleteFormResponsesResponse403, DeleteFormResponsesResponse404, DeleteFormResponsesResponse429, DeleteFormResponsesResponse500, DeleteFormsMetadataParam, DeleteFormsResponse200, DeleteFormsResponse400, DeleteFormsResponse401, DeleteFormsResponse403, DeleteFormsResponse404, DeleteFormsResponse429, DeleteFormsResponse500, DeleteJobActivitiesMetadataParam, DeleteJobActivitiesResponse200, DeleteJobActivitiesResponse400, DeleteJobActivitiesResponse401, DeleteJobActivitiesResponse403, DeleteJobActivitiesResponse404, DeleteJobActivitiesResponse429, DeleteJobActivitiesResponse500, DeleteJobAllocationsMetadataParam, DeleteJobAllocationsResponse200, DeleteJobAllocationsResponse400, DeleteJobAllocationsResponse401, DeleteJobAllocationsResponse403, DeleteJobAllocationsResponse404, DeleteJobAllocationsResponse429, DeleteJobAllocationsResponse500, DeleteJobChecklistsMetadataParam, DeleteJobChecklistsResponse200, DeleteJobChecklistsResponse400, DeleteJobChecklistsResponse401, DeleteJobChecklistsResponse403, DeleteJobChecklistsResponse404, DeleteJobChecklistsResponse429, DeleteJobChecklistsResponse500, DeleteJobContactsMetadataParam, DeleteJobContactsResponse200, DeleteJobContactsResponse400, DeleteJobContactsResponse401, DeleteJobContactsResponse403, DeleteJobContactsResponse404, DeleteJobContactsResponse429, DeleteJobContactsResponse500, DeleteJobMaterialBundlesMetadataParam, DeleteJobMaterialBundlesResponse200, DeleteJobMaterialBundlesResponse400, DeleteJobMaterialBundlesResponse401, DeleteJobMaterialBundlesResponse403, DeleteJobMaterialBundlesResponse404, DeleteJobMaterialBundlesResponse429, DeleteJobMaterialBundlesResponse500, DeleteJobMaterialsMetadataParam, DeleteJobMaterialsResponse200, DeleteJobMaterialsResponse400, DeleteJobMaterialsResponse401, DeleteJobMaterialsResponse403, DeleteJobMaterialsResponse404, DeleteJobMaterialsResponse429, DeleteJobMaterialsResponse500, DeleteJobPaymentsMetadataParam, DeleteJobPaymentsResponse200, DeleteJobPaymentsResponse400, DeleteJobPaymentsResponse401, DeleteJobPaymentsResponse403, DeleteJobPaymentsResponse404, DeleteJobPaymentsResponse429, DeleteJobPaymentsResponse500, DeleteJobQueuesMetadataParam, DeleteJobQueuesResponse200, DeleteJobQueuesResponse400, DeleteJobQueuesResponse401, DeleteJobQueuesResponse403, DeleteJobQueuesResponse404, DeleteJobQueuesResponse429, DeleteJobQueuesResponse500, DeleteJobsMetadataParam, DeleteJobsResponse200, DeleteJobsResponse400, DeleteJobsResponse401, DeleteJobsResponse403, DeleteJobsResponse404, DeleteJobsResponse429, DeleteJobsResponse500, DeleteKnowledgeArticlesMetadataParam, DeleteKnowledgeArticlesResponse200, DeleteKnowledgeArticlesResponse400, DeleteKnowledgeArticlesResponse401, DeleteKnowledgeArticlesResponse403, DeleteKnowledgeArticlesResponse404, DeleteKnowledgeArticlesResponse429, DeleteKnowledgeArticlesResponse500, DeleteLocationsMetadataParam, DeleteLocationsResponse200, DeleteLocationsResponse400, DeleteLocationsResponse401, DeleteLocationsResponse403, DeleteLocationsResponse404, DeleteLocationsResponse429, DeleteLocationsResponse500, DeleteMaterialsMetadataParam, DeleteMaterialsResponse200, DeleteMaterialsResponse400, DeleteMaterialsResponse401, DeleteMaterialsResponse403, DeleteMaterialsResponse404, DeleteMaterialsResponse429, DeleteMaterialsResponse500, DeleteNotesMetadataParam, DeleteNotesResponse200, DeleteNotesResponse400, DeleteNotesResponse401, DeleteNotesResponse403, DeleteNotesResponse404, DeleteNotesResponse429, DeleteNotesResponse500, DeleteSmsTemplatesMetadataParam, DeleteSmsTemplatesResponse200, DeleteSmsTemplatesResponse400, DeleteSmsTemplatesResponse401, DeleteSmsTemplatesResponse403, DeleteSmsTemplatesResponse404, DeleteSmsTemplatesResponse429, DeleteSmsTemplatesResponse500, DeleteStaffMembersMetadataParam, DeleteStaffMembersResponse200, DeleteStaffMembersResponse400, DeleteStaffMembersResponse401, DeleteStaffMembersResponse403, DeleteStaffMembersResponse404, DeleteStaffMembersResponse429, DeleteStaffMembersResponse500, DeleteStaffMessagesMetadataParam, DeleteStaffMessagesResponse200, DeleteStaffMessagesResponse400, DeleteStaffMessagesResponse401, DeleteStaffMessagesResponse403, DeleteStaffMessagesResponse404, DeleteStaffMessagesResponse429, DeleteStaffMessagesResponse500, DeleteSuppliersMetadataParam, DeleteSuppliersResponse200, DeleteSuppliersResponse400, DeleteSuppliersResponse401, DeleteSuppliersResponse403, DeleteSuppliersResponse404, DeleteSuppliersResponse429, DeleteSuppliersResponse500, DeleteTasksMetadataParam, DeleteTasksResponse200, DeleteTasksResponse400, DeleteTasksResponse401, DeleteTasksResponse403, DeleteTasksResponse404, DeleteTasksResponse429, DeleteTasksResponse500, DeleteTaxRatesMetadataParam, DeleteTaxRatesResponse200, DeleteTaxRatesResponse400, DeleteTaxRatesResponse401, DeleteTaxRatesResponse403, DeleteTaxRatesResponse404, DeleteTaxRatesResponse429, DeleteTaxRatesResponse500, GeneralSearchMetadataParam, GeneralSearchResponse200, GeneralSearchResponse400, GeneralSearchResponse500, GetAllocationWindowsMetadataParam, GetAllocationWindowsResponse200, GetAllocationWindowsResponse400, GetAllocationWindowsResponse401, GetAllocationWindowsResponse403, GetAllocationWindowsResponse404, GetAllocationWindowsResponse429, GetAllocationWindowsResponse500, GetAssetTypeFieldsMetadataParam, GetAssetTypeFieldsResponse200, GetAssetTypeFieldsResponse400, GetAssetTypeFieldsResponse401, GetAssetTypeFieldsResponse403, GetAssetTypeFieldsResponse404, GetAssetTypeFieldsResponse429, GetAssetTypeFieldsResponse500, GetAssetTypesMetadataParam, GetAssetTypesResponse200, GetAssetTypesResponse400, GetAssetTypesResponse401, GetAssetTypesResponse403, GetAssetTypesResponse404, GetAssetTypesResponse429, GetAssetTypesResponse500, GetAssetsMetadataParam, GetAssetsResponse200, GetAssetsResponse400, GetAssetsResponse401, GetAssetsResponse403, GetAssetsResponse404, GetAssetsResponse429, GetAssetsResponse500, GetAttachmentsMetadataParam, GetAttachmentsResponse200, GetAttachmentsResponse400, GetAttachmentsResponse401, GetAttachmentsResponse403, GetAttachmentsResponse404, GetAttachmentsResponse429, GetAttachmentsResponse500, GetBadgesMetadataParam, GetBadgesResponse200, GetBadgesResponse400, GetBadgesResponse401, GetBadgesResponse403, GetBadgesResponse404, GetBadgesResponse429, GetBadgesResponse500, GetBundlesMetadataParam, GetBundlesResponse200, GetBundlesResponse400, GetBundlesResponse401, GetBundlesResponse403, GetBundlesResponse404, GetBundlesResponse429, GetBundlesResponse500, GetCategoriesMetadataParam, GetCategoriesResponse200, GetCategoriesResponse400, GetCategoriesResponse401, GetCategoriesResponse403, GetCategoriesResponse404, GetCategoriesResponse429, GetCategoriesResponse500, GetClientsMetadataParam, GetClientsResponse200, GetClientsResponse400, GetClientsResponse401, GetClientsResponse403, GetClientsResponse404, GetClientsResponse429, GetClientsResponse500, GetCompanyContactsMetadataParam, GetCompanyContactsResponse200, GetCompanyContactsResponse400, GetCompanyContactsResponse401, GetCompanyContactsResponse403, GetCompanyContactsResponse404, GetCompanyContactsResponse429, GetCompanyContactsResponse500, GetDocumentTemplatesMetadataParam, GetDocumentTemplatesResponse200, GetDocumentTemplatesResponse400, GetDocumentTemplatesResponse401, GetDocumentTemplatesResponse403, GetDocumentTemplatesResponse404, GetDocumentTemplatesResponse429, GetDocumentTemplatesResponse500, GetEmailTemplatesMetadataParam, GetEmailTemplatesResponse200, GetEmailTemplatesResponse400, GetEmailTemplatesResponse401, GetEmailTemplatesResponse403, GetEmailTemplatesResponse404, GetEmailTemplatesResponse429, GetEmailTemplatesResponse500, GetFeedbackMetadataParam, GetFeedbackResponse200, GetFeedbackResponse400, GetFeedbackResponse401, GetFeedbackResponse403, GetFeedbackResponse404, GetFeedbackResponse429, GetFeedbackResponse500, GetFormFieldsMetadataParam, GetFormFieldsResponse200, GetFormFieldsResponse400, GetFormFieldsResponse401, GetFormFieldsResponse403, GetFormFieldsResponse404, GetFormFieldsResponse429, GetFormFieldsResponse500, GetFormResponsesMetadataParam, GetFormResponsesResponse200, GetFormResponsesResponse400, GetFormResponsesResponse401, GetFormResponsesResponse403, GetFormResponsesResponse404, GetFormResponsesResponse429, GetFormResponsesResponse500, GetFormsMetadataParam, GetFormsResponse200, GetFormsResponse400, GetFormsResponse401, GetFormsResponse403, GetFormsResponse404, GetFormsResponse429, GetFormsResponse500, GetInboxMessageMetadataParam, GetInboxMessageResponse200, GetInboxMessageResponse404, GetJobActivitiesMetadataParam, GetJobActivitiesResponse200, GetJobActivitiesResponse400, GetJobActivitiesResponse401, GetJobActivitiesResponse403, GetJobActivitiesResponse404, GetJobActivitiesResponse429, GetJobActivitiesResponse500, GetJobAllocationsMetadataParam, GetJobAllocationsResponse200, GetJobAllocationsResponse400, GetJobAllocationsResponse401, GetJobAllocationsResponse403, GetJobAllocationsResponse404, GetJobAllocationsResponse429, GetJobAllocationsResponse500, GetJobChecklistsMetadataParam, GetJobChecklistsResponse200, GetJobChecklistsResponse400, GetJobChecklistsResponse401, GetJobChecklistsResponse403, GetJobChecklistsResponse404, GetJobChecklistsResponse429, GetJobChecklistsResponse500, GetJobContactsMetadataParam, GetJobContactsResponse200, GetJobContactsResponse400, GetJobContactsResponse401, GetJobContactsResponse403, GetJobContactsResponse404, GetJobContactsResponse429, GetJobContactsResponse500, GetJobMaterialBundlesMetadataParam, GetJobMaterialBundlesResponse200, GetJobMaterialBundlesResponse400, GetJobMaterialBundlesResponse401, GetJobMaterialBundlesResponse403, GetJobMaterialBundlesResponse404, GetJobMaterialBundlesResponse429, GetJobMaterialBundlesResponse500, GetJobMaterialsMetadataParam, GetJobMaterialsResponse200, GetJobMaterialsResponse400, GetJobMaterialsResponse401, GetJobMaterialsResponse403, GetJobMaterialsResponse404, GetJobMaterialsResponse429, GetJobMaterialsResponse500, GetJobPaymentsMetadataParam, GetJobPaymentsResponse200, GetJobPaymentsResponse400, GetJobPaymentsResponse401, GetJobPaymentsResponse403, GetJobPaymentsResponse404, GetJobPaymentsResponse429, GetJobPaymentsResponse500, GetJobQueuesMetadataParam, GetJobQueuesResponse200, GetJobQueuesResponse400, GetJobQueuesResponse401, GetJobQueuesResponse403, GetJobQueuesResponse404, GetJobQueuesResponse429, GetJobQueuesResponse500, GetJobTemplatesMetadataParam, GetJobTemplatesResponse200, GetJobTemplatesResponse400, GetJobTemplatesResponse401, GetJobTemplatesResponse403, GetJobTemplatesResponse404, GetJobTemplatesResponse429, GetJobTemplatesResponse500, GetJobsMetadataParam, GetJobsResponse200, GetJobsResponse400, GetJobsResponse401, GetJobsResponse403, GetJobsResponse404, GetJobsResponse429, GetJobsResponse500, GetKnowledgeArticlesMetadataParam, GetKnowledgeArticlesResponse200, GetKnowledgeArticlesResponse400, GetKnowledgeArticlesResponse401, GetKnowledgeArticlesResponse403, GetKnowledgeArticlesResponse404, GetKnowledgeArticlesResponse429, GetKnowledgeArticlesResponse500, GetLocationsMetadataParam, GetLocationsResponse200, GetLocationsResponse400, GetLocationsResponse401, GetLocationsResponse403, GetLocationsResponse404, GetLocationsResponse429, GetLocationsResponse500, GetMaterialsMetadataParam, GetMaterialsResponse200, GetMaterialsResponse400, GetMaterialsResponse401, GetMaterialsResponse403, GetMaterialsResponse404, GetMaterialsResponse429, GetMaterialsResponse500, GetNotesMetadataParam, GetNotesResponse200, GetNotesResponse400, GetNotesResponse401, GetNotesResponse403, GetNotesResponse404, GetNotesResponse429, GetNotesResponse500, GetSecurityRolesMetadataParam, GetSecurityRolesResponse200, GetSecurityRolesResponse400, GetSecurityRolesResponse401, GetSecurityRolesResponse403, GetSecurityRolesResponse404, GetSecurityRolesResponse429, GetSecurityRolesResponse500, GetSmsTemplatesMetadataParam, GetSmsTemplatesResponse200, GetSmsTemplatesResponse400, GetSmsTemplatesResponse401, GetSmsTemplatesResponse403, GetSmsTemplatesResponse404, GetSmsTemplatesResponse429, GetSmsTemplatesResponse500, GetStaffMembersMetadataParam, GetStaffMembersResponse200, GetStaffMembersResponse400, GetStaffMembersResponse401, GetStaffMembersResponse403, GetStaffMembersResponse404, GetStaffMembersResponse429, GetStaffMembersResponse500, GetStaffMessagesMetadataParam, GetStaffMessagesResponse200, GetStaffMessagesResponse400, GetStaffMessagesResponse401, GetStaffMessagesResponse403, GetStaffMessagesResponse404, GetStaffMessagesResponse429, GetStaffMessagesResponse500, GetSuppliersMetadataParam, GetSuppliersResponse200, GetSuppliersResponse400, GetSuppliersResponse401, GetSuppliersResponse403, GetSuppliersResponse404, GetSuppliersResponse429, GetSuppliersResponse500, GetTasksMetadataParam, GetTasksResponse200, GetTasksResponse400, GetTasksResponse401, GetTasksResponse403, GetTasksResponse404, GetTasksResponse429, GetTasksResponse500, GetTaxRatesMetadataParam, GetTaxRatesResponse200, GetTaxRatesResponse400, GetTaxRatesResponse401, GetTaxRatesResponse403, GetTaxRatesResponse404, GetTaxRatesResponse429, GetTaxRatesResponse500, GetVendorsMetadataParam, GetVendorsResponse200, GetVendorsResponse400, GetVendorsResponse401, GetVendorsResponse403, GetVendorsResponse404, GetVendorsResponse429, GetVendorsResponse500, JobEmbeddingSearchMetadataParam, JobEmbeddingSearchResponse200, JobEmbeddingSearchResponse400, JobEmbeddingSearchResponse500, JobEmbeddingSearchResponse503, ListAllocationWindowsResponse200, ListAllocationWindowsResponse400, ListAllocationWindowsResponse401, ListAllocationWindowsResponse403, ListAllocationWindowsResponse429, ListAllocationWindowsResponse500, ListAssetTypeFieldsResponse200, ListAssetTypeFieldsResponse400, ListAssetTypeFieldsResponse401, ListAssetTypeFieldsResponse403, ListAssetTypeFieldsResponse429, ListAssetTypeFieldsResponse500, ListAssetTypesResponse200, ListAssetTypesResponse400, ListAssetTypesResponse401, ListAssetTypesResponse403, ListAssetTypesResponse429, ListAssetTypesResponse500, ListAssetsResponse200, ListAssetsResponse400, ListAssetsResponse401, ListAssetsResponse403, ListAssetsResponse429, ListAssetsResponse500, ListAttachmentsResponse200, ListAttachmentsResponse400, ListAttachmentsResponse401, ListAttachmentsResponse403, ListAttachmentsResponse429, ListAttachmentsResponse500, ListBadgesResponse200, ListBadgesResponse400, ListBadgesResponse401, ListBadgesResponse403, ListBadgesResponse429, ListBadgesResponse500, ListBundlesResponse200, ListBundlesResponse400, ListBundlesResponse401, ListBundlesResponse403, ListBundlesResponse429, ListBundlesResponse500, ListCategoriesResponse200, ListCategoriesResponse400, ListCategoriesResponse401, ListCategoriesResponse403, ListCategoriesResponse429, ListCategoriesResponse500, ListClientsResponse200, ListClientsResponse400, ListClientsResponse401, ListClientsResponse403, ListClientsResponse429, ListClientsResponse500, ListCompanyContactsResponse200, ListCompanyContactsResponse400, ListCompanyContactsResponse401, ListCompanyContactsResponse403, ListCompanyContactsResponse429, ListCompanyContactsResponse500, ListDocumentTemplatesResponse200, ListDocumentTemplatesResponse400, ListDocumentTemplatesResponse401, ListDocumentTemplatesResponse403, ListDocumentTemplatesResponse429, ListDocumentTemplatesResponse500, ListEmailTemplatesResponse200, ListEmailTemplatesResponse400, ListEmailTemplatesResponse401, ListEmailTemplatesResponse403, ListEmailTemplatesResponse429, ListEmailTemplatesResponse500, ListFeedbackResponse200, ListFeedbackResponse400, ListFeedbackResponse401, ListFeedbackResponse403, ListFeedbackResponse429, ListFeedbackResponse500, ListFormFieldsResponse200, ListFormFieldsResponse400, ListFormFieldsResponse401, ListFormFieldsResponse403, ListFormFieldsResponse429, ListFormFieldsResponse500, ListFormResponsesResponse200, ListFormResponsesResponse400, ListFormResponsesResponse401, ListFormResponsesResponse403, ListFormResponsesResponse429, ListFormResponsesResponse500, ListFormsResponse200, ListFormsResponse400, ListFormsResponse401, ListFormsResponse403, ListFormsResponse429, ListFormsResponse500, ListInboxMessagesMetadataParam, ListInboxMessagesResponse200, ListInboxMessagesResponse400, ListInboxMessagesResponse403, ListJobActivitiesResponse200, ListJobActivitiesResponse400, ListJobActivitiesResponse401, ListJobActivitiesResponse403, ListJobActivitiesResponse429, ListJobActivitiesResponse500, ListJobAllocationsResponse200, ListJobAllocationsResponse400, ListJobAllocationsResponse401, ListJobAllocationsResponse403, ListJobAllocationsResponse429, ListJobAllocationsResponse500, ListJobChecklistsResponse200, ListJobChecklistsResponse400, ListJobChecklistsResponse401, ListJobChecklistsResponse403, ListJobChecklistsResponse429, ListJobChecklistsResponse500, ListJobContactsResponse200, ListJobContactsResponse400, ListJobContactsResponse401, ListJobContactsResponse403, ListJobContactsResponse429, ListJobContactsResponse500, ListJobMaterialBundlesResponse200, ListJobMaterialBundlesResponse400, ListJobMaterialBundlesResponse401, ListJobMaterialBundlesResponse403, ListJobMaterialBundlesResponse429, ListJobMaterialBundlesResponse500, ListJobMaterialsResponse200, ListJobMaterialsResponse400, ListJobMaterialsResponse401, ListJobMaterialsResponse403, ListJobMaterialsResponse429, ListJobMaterialsResponse500, ListJobPaymentsResponse200, ListJobPaymentsResponse400, ListJobPaymentsResponse401, ListJobPaymentsResponse403, ListJobPaymentsResponse429, ListJobPaymentsResponse500, ListJobQueuesResponse200, ListJobQueuesResponse400, ListJobQueuesResponse401, ListJobQueuesResponse403, ListJobQueuesResponse429, ListJobQueuesResponse500, ListJobTemplatesResponse200, ListJobTemplatesResponse400, ListJobTemplatesResponse401, ListJobTemplatesResponse403, ListJobTemplatesResponse429, ListJobTemplatesResponse500, ListJobsResponse200, ListJobsResponse400, ListJobsResponse401, ListJobsResponse403, ListJobsResponse429, ListJobsResponse500, ListKnowledgeArticlesResponse200, ListKnowledgeArticlesResponse400, ListKnowledgeArticlesResponse401, ListKnowledgeArticlesResponse403, ListKnowledgeArticlesResponse429, ListKnowledgeArticlesResponse500, ListLocationsResponse200, ListLocationsResponse400, ListLocationsResponse401, ListLocationsResponse403, ListLocationsResponse429, ListLocationsResponse500, ListMaterialsResponse200, ListMaterialsResponse400, ListMaterialsResponse401, ListMaterialsResponse403, ListMaterialsResponse429, ListMaterialsResponse500, ListNotesResponse200, ListNotesResponse400, ListNotesResponse401, ListNotesResponse403, ListNotesResponse429, ListNotesResponse500, ListSecurityRolesResponse200, ListSecurityRolesResponse400, ListSecurityRolesResponse401, ListSecurityRolesResponse403, ListSecurityRolesResponse429, ListSecurityRolesResponse500, ListSmsTemplatesResponse200, ListSmsTemplatesResponse400, ListSmsTemplatesResponse401, ListSmsTemplatesResponse403, ListSmsTemplatesResponse429, ListSmsTemplatesResponse500, ListStaffMembersResponse200, ListStaffMembersResponse400, ListStaffMembersResponse401, ListStaffMembersResponse403, ListStaffMembersResponse429, ListStaffMembersResponse500, ListStaffMessagesResponse200, ListStaffMessagesResponse400, ListStaffMessagesResponse401, ListStaffMessagesResponse403, ListStaffMessagesResponse429, ListStaffMessagesResponse500, ListSuppliersResponse200, ListSuppliersResponse400, ListSuppliersResponse401, ListSuppliersResponse403, ListSuppliersResponse429, ListSuppliersResponse500, ListTasksResponse200, ListTasksResponse400, ListTasksResponse401, ListTasksResponse403, ListTasksResponse429, ListTasksResponse500, ListTaxRatesResponse200, ListTaxRatesResponse400, ListTaxRatesResponse401, ListTaxRatesResponse403, ListTaxRatesResponse429, ListTaxRatesResponse500, ListVendorsResponse200, ListVendorsResponse400, ListVendorsResponse401, ListVendorsResponse403, ListVendorsResponse429, ListVendorsResponse500, MarkInboxMessageAsReadMetadataParam, MarkInboxMessageAsReadResponse200, MarkInboxMessageAsReadResponse404, ObjectSearchMetadataParam, ObjectSearchResponse200, ObjectSearchResponse400, ObjectSearchResponse429, ObjectSearchResponse500, SnoozeInboxMessageBodyParam, SnoozeInboxMessageMetadataParam, SnoozeInboxMessageResponse200, SnoozeInboxMessageResponse400, UpdateAllocationWindowsBodyParam, UpdateAllocationWindowsMetadataParam, UpdateAllocationWindowsResponse200, UpdateAllocationWindowsResponse400, UpdateAllocationWindowsResponse401, UpdateAllocationWindowsResponse403, UpdateAllocationWindowsResponse404, UpdateAllocationWindowsResponse429, UpdateAllocationWindowsResponse500, UpdateAssetTypeFieldsBodyParam, UpdateAssetTypeFieldsMetadataParam, UpdateAssetTypeFieldsResponse200, UpdateAssetTypeFieldsResponse400, UpdateAssetTypeFieldsResponse401, UpdateAssetTypeFieldsResponse403, UpdateAssetTypeFieldsResponse404, UpdateAssetTypeFieldsResponse429, UpdateAssetTypeFieldsResponse500, UpdateAssetTypesBodyParam, UpdateAssetTypesMetadataParam, UpdateAssetTypesResponse200, UpdateAssetTypesResponse400, UpdateAssetTypesResponse401, UpdateAssetTypesResponse403, UpdateAssetTypesResponse404, UpdateAssetTypesResponse429, UpdateAssetTypesResponse500, UpdateAssetsBodyParam, UpdateAssetsMetadataParam, UpdateAssetsResponse200, UpdateAssetsResponse400, UpdateAssetsResponse401, UpdateAssetsResponse403, UpdateAssetsResponse404, UpdateAssetsResponse429, UpdateAssetsResponse500, UpdateAttachmentsBodyParam, UpdateAttachmentsMetadataParam, UpdateAttachmentsResponse200, UpdateAttachmentsResponse400, UpdateAttachmentsResponse401, UpdateAttachmentsResponse403, UpdateAttachmentsResponse404, UpdateAttachmentsResponse429, UpdateAttachmentsResponse500, UpdateBadgesBodyParam, UpdateBadgesMetadataParam, UpdateBadgesResponse200, UpdateBadgesResponse400, UpdateBadgesResponse401, UpdateBadgesResponse403, UpdateBadgesResponse404, UpdateBadgesResponse429, UpdateBadgesResponse500, UpdateBundlesBodyParam, UpdateBundlesMetadataParam, UpdateBundlesResponse200, UpdateBundlesResponse400, UpdateBundlesResponse401, UpdateBundlesResponse403, UpdateBundlesResponse404, UpdateBundlesResponse429, UpdateBundlesResponse500, UpdateCategoriesBodyParam, UpdateCategoriesMetadataParam, UpdateCategoriesResponse200, UpdateCategoriesResponse400, UpdateCategoriesResponse401, UpdateCategoriesResponse403, UpdateCategoriesResponse404, UpdateCategoriesResponse429, UpdateCategoriesResponse500, UpdateClientsBodyParam, UpdateClientsMetadataParam, UpdateClientsResponse200, UpdateClientsResponse400, UpdateClientsResponse401, UpdateClientsResponse403, UpdateClientsResponse404, UpdateClientsResponse429, UpdateClientsResponse500, UpdateCompanyContactsBodyParam, UpdateCompanyContactsMetadataParam, UpdateCompanyContactsResponse200, UpdateCompanyContactsResponse400, UpdateCompanyContactsResponse401, UpdateCompanyContactsResponse403, UpdateCompanyContactsResponse404, UpdateCompanyContactsResponse429, UpdateCompanyContactsResponse500, UpdateDocumentTemplatesBodyParam, UpdateDocumentTemplatesMetadataParam, UpdateDocumentTemplatesResponse200, UpdateDocumentTemplatesResponse400, UpdateDocumentTemplatesResponse401, UpdateDocumentTemplatesResponse403, UpdateDocumentTemplatesResponse404, UpdateDocumentTemplatesResponse429, UpdateDocumentTemplatesResponse500, UpdateEmailTemplatesBodyParam, UpdateEmailTemplatesMetadataParam, UpdateEmailTemplatesResponse200, UpdateEmailTemplatesResponse400, UpdateEmailTemplatesResponse401, UpdateEmailTemplatesResponse403, UpdateEmailTemplatesResponse404, UpdateEmailTemplatesResponse429, UpdateEmailTemplatesResponse500, UpdateFeedbackBodyParam, UpdateFeedbackMetadataParam, UpdateFeedbackResponse200, UpdateFeedbackResponse400, UpdateFeedbackResponse401, UpdateFeedbackResponse403, UpdateFeedbackResponse404, UpdateFeedbackResponse429, UpdateFeedbackResponse500, UpdateFormFieldsBodyParam, UpdateFormFieldsMetadataParam, UpdateFormFieldsResponse200, UpdateFormFieldsResponse400, UpdateFormFieldsResponse401, UpdateFormFieldsResponse403, UpdateFormFieldsResponse404, UpdateFormFieldsResponse429, UpdateFormFieldsResponse500, UpdateFormResponsesBodyParam, UpdateFormResponsesMetadataParam, UpdateFormResponsesResponse200, UpdateFormResponsesResponse400, UpdateFormResponsesResponse401, UpdateFormResponsesResponse403, UpdateFormResponsesResponse404, UpdateFormResponsesResponse429, UpdateFormResponsesResponse500, UpdateFormsBodyParam, UpdateFormsMetadataParam, UpdateFormsResponse200, UpdateFormsResponse400, UpdateFormsResponse401, UpdateFormsResponse403, UpdateFormsResponse404, UpdateFormsResponse429, UpdateFormsResponse500, UpdateJobActivitiesBodyParam, UpdateJobActivitiesMetadataParam, UpdateJobActivitiesResponse200, UpdateJobActivitiesResponse400, UpdateJobActivitiesResponse401, UpdateJobActivitiesResponse403, UpdateJobActivitiesResponse404, UpdateJobActivitiesResponse429, UpdateJobActivitiesResponse500, UpdateJobAllocationsBodyParam, UpdateJobAllocationsMetadataParam, UpdateJobAllocationsResponse200, UpdateJobAllocationsResponse400, UpdateJobAllocationsResponse401, UpdateJobAllocationsResponse403, UpdateJobAllocationsResponse404, UpdateJobAllocationsResponse429, UpdateJobAllocationsResponse500, UpdateJobChecklistsBodyParam, UpdateJobChecklistsMetadataParam, UpdateJobChecklistsResponse200, UpdateJobChecklistsResponse400, UpdateJobChecklistsResponse401, UpdateJobChecklistsResponse403, UpdateJobChecklistsResponse404, UpdateJobChecklistsResponse429, UpdateJobChecklistsResponse500, UpdateJobContactsBodyParam, UpdateJobContactsMetadataParam, UpdateJobContactsResponse200, UpdateJobContactsResponse400, UpdateJobContactsResponse401, UpdateJobContactsResponse403, UpdateJobContactsResponse404, UpdateJobContactsResponse429, UpdateJobContactsResponse500, UpdateJobMaterialBundlesBodyParam, UpdateJobMaterialBundlesMetadataParam, UpdateJobMaterialBundlesResponse200, UpdateJobMaterialBundlesResponse400, UpdateJobMaterialBundlesResponse401, UpdateJobMaterialBundlesResponse403, UpdateJobMaterialBundlesResponse404, UpdateJobMaterialBundlesResponse429, UpdateJobMaterialBundlesResponse500, UpdateJobMaterialsBodyParam, UpdateJobMaterialsMetadataParam, UpdateJobMaterialsResponse200, UpdateJobMaterialsResponse400, UpdateJobMaterialsResponse401, UpdateJobMaterialsResponse403, UpdateJobMaterialsResponse404, UpdateJobMaterialsResponse429, UpdateJobMaterialsResponse500, UpdateJobPaymentsBodyParam, UpdateJobPaymentsMetadataParam, UpdateJobPaymentsResponse200, UpdateJobPaymentsResponse400, UpdateJobPaymentsResponse401, UpdateJobPaymentsResponse403, UpdateJobPaymentsResponse404, UpdateJobPaymentsResponse429, UpdateJobPaymentsResponse500, UpdateJobQueuesBodyParam, UpdateJobQueuesMetadataParam, UpdateJobQueuesResponse200, UpdateJobQueuesResponse400, UpdateJobQueuesResponse401, UpdateJobQueuesResponse403, UpdateJobQueuesResponse404, UpdateJobQueuesResponse429, UpdateJobQueuesResponse500, UpdateJobsBodyParam, UpdateJobsMetadataParam, UpdateJobsResponse200, UpdateJobsResponse400, UpdateJobsResponse401, UpdateJobsResponse403, UpdateJobsResponse404, UpdateJobsResponse429, UpdateJobsResponse500, UpdateKnowledgeArticlesBodyParam, UpdateKnowledgeArticlesMetadataParam, UpdateKnowledgeArticlesResponse200, UpdateKnowledgeArticlesResponse400, UpdateKnowledgeArticlesResponse401, UpdateKnowledgeArticlesResponse403, UpdateKnowledgeArticlesResponse404, UpdateKnowledgeArticlesResponse429, UpdateKnowledgeArticlesResponse500, UpdateLocationsBodyParam, UpdateLocationsMetadataParam, UpdateLocationsResponse200, UpdateLocationsResponse400, UpdateLocationsResponse401, UpdateLocationsResponse403, UpdateLocationsResponse404, UpdateLocationsResponse429, UpdateLocationsResponse500, UpdateMaterialsBodyParam, UpdateMaterialsMetadataParam, UpdateMaterialsResponse200, UpdateMaterialsResponse400, UpdateMaterialsResponse401, UpdateMaterialsResponse403, UpdateMaterialsResponse404, UpdateMaterialsResponse429, UpdateMaterialsResponse500, UpdateNotesBodyParam, UpdateNotesMetadataParam, UpdateNotesResponse200, UpdateNotesResponse400, UpdateNotesResponse401, UpdateNotesResponse403, UpdateNotesResponse404, UpdateNotesResponse429, UpdateNotesResponse500, UpdateSmsTemplatesBodyParam, UpdateSmsTemplatesMetadataParam, UpdateSmsTemplatesResponse200, UpdateSmsTemplatesResponse400, UpdateSmsTemplatesResponse401, UpdateSmsTemplatesResponse403, UpdateSmsTemplatesResponse404, UpdateSmsTemplatesResponse429, UpdateSmsTemplatesResponse500, UpdateStaffMembersBodyParam, UpdateStaffMembersMetadataParam, UpdateStaffMembersResponse200, UpdateStaffMembersResponse400, UpdateStaffMembersResponse401, UpdateStaffMembersResponse403, UpdateStaffMembersResponse404, UpdateStaffMembersResponse429, UpdateStaffMembersResponse500, UpdateStaffMessagesBodyParam, UpdateStaffMessagesMetadataParam, UpdateStaffMessagesResponse200, UpdateStaffMessagesResponse400, UpdateStaffMessagesResponse401, UpdateStaffMessagesResponse403, UpdateStaffMessagesResponse404, UpdateStaffMessagesResponse429, UpdateStaffMessagesResponse500, UpdateSuppliersBodyParam, UpdateSuppliersMetadataParam, UpdateSuppliersResponse200, UpdateSuppliersResponse400, UpdateSuppliersResponse401, UpdateSuppliersResponse403, UpdateSuppliersResponse404, UpdateSuppliersResponse429, UpdateSuppliersResponse500, UpdateTasksBodyParam, UpdateTasksMetadataParam, UpdateTasksResponse200, UpdateTasksResponse400, UpdateTasksResponse401, UpdateTasksResponse403, UpdateTasksResponse404, UpdateTasksResponse429, UpdateTasksResponse500, UpdateTaxRatesBodyParam, UpdateTaxRatesMetadataParam, UpdateTaxRatesResponse200, UpdateTaxRatesResponse400, UpdateTaxRatesResponse401, UpdateTaxRatesResponse403, UpdateTaxRatesResponse404, UpdateTaxRatesResponse429, UpdateTaxRatesResponse500 } from './types';
