import { PayloadAction } from '@reduxjs/toolkit';

export type PushFeedbackPayloadType = {
  code: string;
  values: { [x: string]: string };
};

export type FeedbackConfigType = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  position: 'top-right' | 'top-left' | 'top-center';
  feedbackType: 'snackbar' | 'modal';
  title: string;
  timeout?: number;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: string;
  onSecondaryButtonClick?: string;
};

export interface DownloadFilesStatusesType {
  fileName: string;
  fileUrl: string;
  status?: DownloadFilesStatusType;
  progress: number;
  requestId: string;
}
export type DownloadFilesStatusType = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILURE';
export type FeedbackHandlerConfigType = Record<string, FeedbackConfigType>;

export interface FeedbackHandlerStateType {
  feedbacks: PushFeedbackPayloadType[];
  feedbacksConfig: FeedbackHandlerConfigType;
  downloadFilesStatuses: DownloadFilesStatusesType[];
  closedRequests: string[];
  spinnerActions: string[];
  errors: string[];
}

export interface RESTCallAction extends PayloadAction<any> {
  meta: {
    startedTimeStamp: number,
    RTK_autoBatch: boolean,
    arg: {
      type: 'query' | 'mutation',
      subscribe: boolean,
      subscriptionOptions: {
        pollingInterval: number,
        skipPollingIfUnfocused: boolean
      },
      baseQueryMeta?: {
        request: Request
        response?: Response
      },
      endpointName: string,
      queryCacheKey: string
    },
    requestId: string,
    requestStatus: 'pending' | 'fulfilled' | 'rejected',
  }
}