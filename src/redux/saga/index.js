import { all, fork } from 'redux-saga/effects';
import { CityListSaga, CountryListSaga, getAllCityListSaga, SaveLocationSaga, StateListSaga } from './address.Saga';
import { ChangePasswordSaga, ForgotSaga, LoginSaga, OTPVerification, Registration, ResetPasswordSaga, UpdateEmailSaga, validateEmailOtpSaga } from './auth.Saga';
import { GetHairTypes, SaveHairTypeSaga, UpdateTenderHeadLevelSaga } from './hair.Saga';
import { GetAllServicesSaga, SaveEditServicesPriceSaga, GetProfileQuestionSaga, GetProfileSaga, DeleteProviderPortfolioSaga, SaveProviderPortfolioSaga, GetSavedServicesSaga, ProfileOneSetup, ProfileTwoSetup, ProviderProfileSetupThree, ProviderSaveDepositeFeesSaga, SaveGenderSaga, SaveProfileSaga, SaveProviderProfileSaga, SaveQuestionAnswerSaga, SaveServicesPriceSaga, UpdateServicesSaga, SaveServicesSaga, SaveLicenseSaga, ProviderBioSaga, GetCustomerDetailSaga, GetSpDetailSaga, GetCustomServicesSaga, AddCustomServicesSaga, GetSpCustomServicesSaga, OpenTimeSaga, NotificationListSaga, NotificationCountSaga, GetProfessionsListSaga, GetServicesByProfessionSaga, AddProviderProfessionSaga, DeleteAccountSaga } from './profileSetup.Saga';
import { CancelPlanSaga, GetSubscriptionPlanSaga, SaveSubscriptionPlanSaga } from './subscriptionPlan.Saga';
import { GetProviderListSaga, GetProviderProfileSaga, GetCompleteProviderDetailSaga, GetFiltePriceListSaga } from "./providerlist.Saga"
import { BookingSaga, SupportSaga, PaymentSaga, RequestFundSaga, FundListSaga } from './booking.Saga';
import { CustomerAppointmentSaga, CancelAppointmentSaga, ProviderAppointmentSaga, AvailabilitySaga, ApproveRejectSaga, AppointmentCompleteSaga, AppointmentHistorySaga, AppointmentDetailSaga, StartServiceSaga, UpdateServicePriceSaga } from './appointment.Saga';
import { AllQuestionSaga, AddQuestionSaga, CommonQuestionSaga, DeleteQuestionSaga, LikeDislikeQuestionSaga, LikeDislikeCommentSaga, QuestionByQuestionIdSaga } from './question.Saga';
import { SearchServicesSaga, SearchProviderSaga } from './search.Saga';
import { PriceRangeSaga } from './pricerange.Saga';
import { ChatSaga, SaveChatSaga, GetChatMessagesSaga, GetChatListSaga, NotificationReadSaga } from './chat.Saga';
import { SPDataStepSaga, CSDataStepSaga } from './step.Saga';
import { CommentSaga, CommentHistorySaga, DeleteCommentSaga, GetSuggestionsSaga } from './comment.Saga';
import { RatingTypeSaga, RatingSaga, EarningsSaga, FundSaga } from './rating.Saga';
import { CMSSaga } from './cms.Saga';
import { AddBrandNameSaga, AddProductSaga, BrandCategorySaga, BrandSearchSaga, CategorySearchSaga, CustomerProductSaga, DeleteProductSaga, MyProductListSaga } from './product.Saga';
import { AddOrderSaga, CancelOrderSaga, CustomerOrderSaga, MarkAsDeliveredSaga, MyAddressSaga, OrderStatusSaga, PaymentSaveSaga, ProviderOrderSaga } from './orders.Saga';
import { getServicesByProfessionAction } from '../action';

// Api Calls
export function* rootSaga() {
    yield all([
        fork(Registration),
        fork(OTPVerification),
        fork(ProfileOneSetup),
        fork(ProfileTwoSetup),
        fork(CountryListSaga),
        fork(StateListSaga),
        fork(CityListSaga),
        fork(SaveLocationSaga),
        fork(GetHairTypes),
        fork(SaveHairTypeSaga),
        fork(SaveGenderSaga),
        fork(GetProfileQuestionSaga),
        fork(SaveQuestionAnswerSaga),
        fork(LoginSaga),
        fork(ForgotSaga),
        fork(GetProfileSaga),
        fork(GetProviderProfileSaga),
        fork(SaveProfileSaga),
        fork(SaveProviderPortfolioSaga),
        fork(DeleteProviderPortfolioSaga),
        fork(SaveProviderProfileSaga),
        fork(ProviderProfileSetupThree),
        fork(ProviderSaveDepositeFeesSaga),
        fork(GetAllServicesSaga),
        fork(SaveServicesSaga),
        fork(UpdateServicesSaga),
        fork(GetSubscriptionPlanSaga),
        fork(SaveSubscriptionPlanSaga),
        fork(GetSavedServicesSaga),
        fork(SaveServicesPriceSaga),
        fork(SaveEditServicesPriceSaga),
        fork(GetProviderListSaga),
        fork(GetCompleteProviderDetailSaga),
        fork(BookingSaga),
        fork(SupportSaga),
        fork(CustomerAppointmentSaga),
        fork(CancelAppointmentSaga),
        fork(AllQuestionSaga),
        fork(ProviderAppointmentSaga),
        fork(AvailabilitySaga),
        fork(SaveLicenseSaga),
        fork(ApproveRejectSaga),
        fork(SearchServicesSaga),
        fork(PriceRangeSaga),
        fork(SearchProviderSaga),
        fork(AddQuestionSaga),
        fork(DeleteQuestionSaga),
        fork(LikeDislikeQuestionSaga),
        fork(LikeDislikeCommentSaga),
        fork(CommonQuestionSaga),
        fork(AppointmentCompleteSaga),
        fork(AppointmentHistorySaga),
        fork(ChatSaga),
        fork(ProviderBioSaga),
        fork(SPDataStepSaga),
        fork(CSDataStepSaga),
        fork(SaveChatSaga),
        fork(GetChatMessagesSaga),
        fork(GetChatListSaga),
        fork(CommentSaga),
        fork(AppointmentDetailSaga),
        fork(StartServiceSaga),
        fork(RatingTypeSaga),
        fork(RatingSaga),
        fork(FundSaga),
        fork(CommentHistorySaga),
        fork(PaymentSaga),
        fork(EarningsSaga),
        fork(RequestFundSaga),
        fork(ResetPasswordSaga),
        fork(FundListSaga),
        fork(NotificationReadSaga),
        fork(CMSSaga),
        fork(CancelPlanSaga),
        fork(GetCustomerDetailSaga),
        fork(GetSpDetailSaga),
        fork(UpdateEmailSaga),
        fork(validateEmailOtpSaga),
        fork(ChangePasswordSaga),
        fork(UpdateTenderHeadLevelSaga),
        fork(GetCustomServicesSaga),
        fork(AddCustomServicesSaga),
        fork(GetSpCustomServicesSaga),
        fork(AddProductSaga),
        fork(BrandCategorySaga),
        fork(MyProductListSaga),
        fork(DeleteProductSaga),
        fork(CustomerProductSaga),
        fork(CategorySearchSaga),
        fork(BrandSearchSaga),
        fork(AddOrderSaga),
        fork(MyAddressSaga),
        fork(CustomerOrderSaga),
        fork(ProviderOrderSaga),
        fork(PaymentSaveSaga),
        fork(MarkAsDeliveredSaga),
        fork(CancelOrderSaga),
        fork(AddBrandNameSaga),
        fork(OrderStatusSaga),
        fork(OpenTimeSaga),
        fork(DeleteCommentSaga),
        fork(GetSuggestionsSaga),
        fork(NotificationListSaga),
        fork(NotificationCountSaga),
        fork(QuestionByQuestionIdSaga),
        fork(UpdateServicePriceSaga),
        fork(GetProfessionsListSaga),
        fork(GetServicesByProfessionSaga),
        fork(AddProviderProfessionSaga),
        fork(DeleteAccountSaga),
        fork(GetFiltePriceListSaga),
        fork(getAllCityListSaga)
    ])
}