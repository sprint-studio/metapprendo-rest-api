export default class EndpointsManager {
  static companyEndpoint(companyId: string): string {
    return `/companies/${companyId}`;
  }

  static createCompanyEndpoint(companyId: string): string {
    return this.companyEndpoint(companyId);
  }

  static companyAdminEndpoint(companayId: string): string {
    return `${this.companyEndpoint(companayId)}/admin`;
  }

  static addWorkerToCompanyEndpoint(
    companayId: string,
    userId: string
  ): string {
    return `${this.companyAdminEndpoint(companayId)}/worker/${userId}`;
  }

  static deleteWorkerFromCompanyEndpoint(
    companayId: string,
    userId: string
  ): string {
    return `${this.companyAdminEndpoint(companayId)}/worker/${userId}`;
  }

  /**
   * Company Educational Agenda
   */

  static companyEducationalAgendaEndpoint() {
    return `/company_educational_agendas`;
  }

  static createCompanyEducationalAgendaEndpoint() {
    return this.companyEducationalAgendaEndpoint();
  }

  static getCompanyEducationalAgendaEndpoint(
    companyEducationalAgendaId: string
  ) {
    return `${this.companyEducationalAgendaEndpoint()}/${companyEducationalAgendaId}`;
  }

  /**
   *  Educational Path
   */

  static educationaPathEndpoint() {
    return `/educational_path`;
  }

  static createEducationaPathEndpoint() {
    return this.educationaPathEndpoint();
  }

  static getEducationaPathEndpoint(educationalPathId: string) {
    return `${this.educationaPathEndpoint()}/${educationalPathId}`;
  }

  /**
   *  Educational Pill
   */

  static educationaPillEndpoint() {
    return `/educational_pills`;
  }

  static createEducationaPillEndpoint() {
    return this.educationaPillEndpoint();
  }

  static getEducationaPillEndpoint(educationalPillId: string) {
    return `${this.educationaPillEndpoint()}/${educationalPillId}`;
  }
}
