import { ToastService } from 'src/app/core/services/toast/toast.service';

export abstract class TableView {
  protected processOngoing: boolean = false;
  protected loadingMessage: string = '';

  constructor(protected readonly toastService: ToastService) {}

  createEntityError() {
    this.toastService.showError(
      "Can't create entity. Check if all fields are correct or try again later."
    );
  }

  createEntitySuccess() {
    this.toastService.showSuccess('Entity has been created successfully!');
  }

  deleteEntityError() {
    this.toastService.showError(
      "Can't delete entity. Check if all fields are correct or try again later."
    );
  }

  deleteEntitySuccess() {
    this.toastService.showSuccess('Entity has been deleted successfully!');
  }

  abstract deleteEntity(entity: any): void;
  abstract modifyEntity(entity: any): void;
}
