import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {ReportingInput} from './app.models';
import {AppServices} from './app.services';
import {printByFormat} from './utils';

export enum StatusEnum {
    error = 'error',
    success = 'success',
    warning = 'warn'
}

export class GloabalMessageConfig {

    private static errorMsg = 'Erreur de connection. Veuillez Contacter l\'administrateur';

    static setStatusMessage(status: number, localMessage: string, error?: HttpErrorResponse) {
        if (localMessage) {
            return localMessage;
        } else {
            switch (status) {
                case 200:
                    return 'Opération reussie';
                case 201:
                    return 'Opération reussie';
                case 204:
                    return 'Opération reussie';
                case 409:
                    return error.error.message;
                case 400:
                    return error.error.message;
                case 404: {
                    console.log('====error.error.message====');
                    console.log(error.error.message);
                    if (error.error.message) {
                        return error.error.message;
                    } else {
                        return this.errorMsg;
                    }
                }
                case 500:
                    return this.errorMsg;
                default: {
                    return this.errorMsg;
                }
            }
        }
    }

    static returnMsgFromArrayBuffer(buf: ArrayBuffer): string {
        let response;
        if ('TextDecoder' in window) {
            // Decode as UTF-8
            const dataView = new DataView(buf);
            const decoder = new TextDecoder('utf8');
            response = JSON.parse(decoder.decode(dataView));
        } else {
            const decodedString = String.fromCharCode.apply(null, new Uint8Array(buf));
            response = JSON.parse(decodedString);
        }
        return response.message;
    }
}

export function buildMessage(severity: StatusEnum, status: number, localMessage: string, error?: HttpErrorResponse): any {
    const message = GloabalMessageConfig.setStatusMessage(status, localMessage, error);
    return {
        key: 'key',
        severity,
        summary: null,
        detail: message
    };
}

export function showToast(severity: StatusEnum, status: number, message: string,
                          messageService: MessageService, error?: HttpErrorResponse) {
    messageService.add(buildMessage(severity, status, message, error));
}

export function messageShow(severity: string, summary: string, detail: string, messageService: MessageService) {
    messageService.add({key: 'key', severity, summary, detail});
}

/**
 *  Cette fonction permet d'imprimer le report en fonction deplusieur format de fichier.
 */
export function printReportMultiFormat(reportInput: ReportingInput, appService: AppServices,
                                       messageService: MessageService ) {
    appService.printReport(reportInput).subscribe(arraybytes => {
            if (arraybytes) {
                printByFormat(arraybytes, reportInput.reportFormat);
            }
        }, error => showToast(StatusEnum.error, error.status, null, messageService, error));
}

