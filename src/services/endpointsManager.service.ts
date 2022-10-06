export default class EndpointsManager {

  static companyEndpoint(companyId: string): string { 
    return `/companies/${companyId}`;
  }

  static createCompanyEndpoint(companyId: string): string {
    return this.companyEndpoint(companyId);
  }

  static companyAdminEndpoint(companayId: string): string {
    return `${this.companyAdminEndpoint(companayId)}/admin`;
  }

  static addWorkerToCompanyEndpoint(companayId: string, userId: string): string {
    return `${this.companyAdminEndpoint(companayId)}/worker/${userId}`;
  }

  static deleteWorkerFromCompanyEndpoint(companayId: string, userId: string): string {
    return `${this.companyAdminEndpoint(companayId)}/worker/${userId}`;
  }
}