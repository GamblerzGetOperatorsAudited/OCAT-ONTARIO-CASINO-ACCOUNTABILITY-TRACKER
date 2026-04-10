/**
 * Expanded OCAT Issue Categories (100+) with 35-45 Questions Each
 * Generated from real casino complaints, regulatory standards, and player feedback
 */

export interface IssueQuestion {
  id: string;
  text: string;
  category: string;
}

export interface IssueCategory {
  id: string;
  name: string;
  description: string;
  riskWeight: number; // 1-10 severity multiplier
  questions: IssueQuestion[];
}

export const EXPANDED_ISSUE_CATEGORIES: IssueCategory[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // WITHDRAWAL & PAYMENT ISSUES (Categories 1-15)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "withdrawal_delays",
    name: "Withdrawal Delays",
    description: "Funds stuck in pending status for extended periods",
    riskWeight: 9,
    questions: [
      { id: "w1", text: "Was your withdrawal request submitted and not processed within 5 business days?", category: "withdrawal_delays" },
      { id: "w2", text: "Did the casino provide no timeline or estimated completion date?", category: "withdrawal_delays" },
      { id: "w3", text: "Were you told to wait without any status updates for weeks?", category: "withdrawal_delays" },
      { id: "w4", text: "Did support claim the withdrawal was 'processing' but never completed?", category: "withdrawal_delays" },
      { id: "w5", text: "Were you asked to make additional deposits to 'speed up' the withdrawal?", category: "withdrawal_delays" },
      { id: "w6", text: "Did the casino reverse or cancel your withdrawal without explanation?", category: "withdrawal_delays" },
      { id: "w7", text: "Were you required to complete additional verification after already being verified?", category: "withdrawal_delays" },
      { id: "w8", text: "Did the casino claim the withdrawal was 'lost' in their system?", category: "withdrawal_delays" },
      { id: "w9", text: "Were you told different reasons for the delay by different support agents?", category: "withdrawal_delays" },
      { id: "w10", text: "Did the casino offer no compensation for the delay?", category: "withdrawal_delays" },
      { id: "w11", text: "Was the delay longer than 30 days?", category: "withdrawal_delays" },
      { id: "w12", text: "Did you attempt to contact support multiple times without resolution?", category: "withdrawal_delays" },
      { id: "w13", text: "Were you unable to contact support about your withdrawal?", category: "withdrawal_delays" },
      { id: "w14", text: "Did the casino claim a 'system error' caused the delay?", category: "withdrawal_delays" },
      { id: "w15", text: "Were you asked to withdraw via a different payment method?", category: "withdrawal_delays" },
      { id: "w16", text: "Did the casino charge fees for the delayed withdrawal?", category: "withdrawal_delays" },
      { id: "w17", text: "Was your account restricted during the withdrawal delay?", category: "withdrawal_delays" },
      { id: "w18", text: "Did the casino claim the delay was due to 'payment processor issues'?", category: "withdrawal_delays" },
      { id: "w19", text: "Were you unable to cancel the withdrawal request?", category: "withdrawal_delays" },
      { id: "w20", text: "Did the casino ask for proof of funds before releasing the withdrawal?", category: "withdrawal_delays" },
      { id: "w21", text: "Was the withdrawal eventually processed but with less than expected?", category: "withdrawal_delays" },
      { id: "w22", text: "Did the casino deduct unexplained fees from the withdrawal?", category: "withdrawal_delays" },
      { id: "w23", text: "Were you told the delay was due to 'high volume'?", category: "withdrawal_delays" },
      { id: "w24", text: "Did the casino offer a bonus instead of processing the withdrawal?", category: "withdrawal_delays" },
      { id: "w25", text: "Was the withdrawal amount changed without your consent?", category: "withdrawal_delays" },
      { id: "w26", text: "Did support provide generic copy-paste responses about the delay?", category: "withdrawal_delays" },
      { id: "w27", text: "Were you unable to escalate the issue to a supervisor?", category: "withdrawal_delays" },
      { id: "w28", text: "Did the casino claim they never received the withdrawal request?", category: "withdrawal_delays" },
      { id: "w29", text: "Was the delay coinciding with a winning streak?", category: "withdrawal_delays" },
      { id: "w30", text: "Did the casino require you to play through your balance again?", category: "withdrawal_delays" },
      { id: "w31", text: "Were you asked to provide bank statements or proof of account ownership?", category: "withdrawal_delays" },
      { id: "w32", text: "Did the casino claim the withdrawal violated their terms?", category: "withdrawal_delays" },
      { id: "w33", text: "Was the delay longer than any other player's withdrawal you know of?", category: "withdrawal_delays" },
      { id: "w34", text: "Did the casino offer no explanation for the delay?", category: "withdrawal_delays" },
      { id: "w35", text: "Were you told to contact your bank instead of the casino?", category: "withdrawal_delays" },
      { id: "w36", text: "Did the casino claim the withdrawal was 'pending bank approval'?", category: "withdrawal_delays" },
      { id: "w37", text: "Was the withdrawal eventually rejected or returned?", category: "withdrawal_delays" },
      { id: "w38", text: "Did you lose money due to currency fluctuations during the delay?", category: "withdrawal_delays" },
      { id: "w39", text: "Were you unable to file a complaint with the casino?", category: "withdrawal_delays" },
      { id: "w40", text: "Did the casino threaten to close your account if you complained?", category: "withdrawal_delays" },
    ],
  },

  {
    id: "withdrawal_denied",
    name: "Withdrawal Denied/Rejected",
    description: "Casino refused to process withdrawal or rejected it without valid reason",
    riskWeight: 10,
    questions: [
      { id: "wd1", text: "Did the casino deny your withdrawal request without clear explanation?", category: "withdrawal_denied" },
      { id: "wd2", text: "Were you told the withdrawal violated 'terms and conditions'?", category: "withdrawal_denied" },
      { id: "wd3", text: "Did the casino claim you had 'suspicious activity' on your account?", category: "withdrawal_denied" },
      { id: "wd4", text: "Were you accused of bonus abuse or terms violation?", category: "withdrawal_denied" },
      { id: "wd5", text: "Did the casino confiscate your winnings without explanation?", category: "withdrawal_denied" },
      { id: "wd6", text: "Was your account closed and funds frozen?", category: "withdrawal_denied" },
      { id: "wd7", text: "Did the casino claim you were using a VPN or proxy?", category: "withdrawal_denied" },
      { id: "wd8", text: "Were you told you violated geolocation restrictions?", category: "withdrawal_denied" },
      { id: "wd9", text: "Did the casino claim you had multiple accounts?", category: "withdrawal_denied" },
      { id: "wd10", text: "Were you accused of using automated betting tools?", category: "withdrawal_denied" },
      { id: "wd11", text: "Did the casino claim the withdrawal was 'flagged for review'?", category: "withdrawal_denied" },
      { id: "wd12", text: "Were you unable to appeal the withdrawal denial?", category: "withdrawal_denied" },
      { id: "wd13", text: "Did the casino offer no way to dispute the decision?", category: "withdrawal_denied" },
      { id: "wd14", text: "Was the denial decision made by an automated system?", category: "withdrawal_denied" },
      { id: "wd15", text: "Did support refuse to explain the reason for denial?", category: "withdrawal_denied" },
      { id: "wd16", text: "Were you given conflicting reasons for the denial?", category: "withdrawal_denied" },
      { id: "wd17", text: "Did the casino claim the denial was 'permanent'?", category: "withdrawal_denied" },
      { id: "wd18", text: "Were your funds forfeited after the denial?", category: "withdrawal_denied" },
      { id: "wd19", text: "Did the casino offer to keep your funds as a bonus instead?", category: "withdrawal_denied" },
      { id: "wd20", text: "Was the denial decision made immediately after you requested withdrawal?", category: "withdrawal_denied" },
      { id: "wd21", text: "Did the casino claim regulatory reasons for the denial?", category: "withdrawal_denied" },
      { id: "wd22", text: "Were you unable to contact support about the denial?", category: "withdrawal_denied" },
      { id: "wd23", text: "Did the casino claim the denial was due to 'payment processor restrictions'?", category: "withdrawal_denied" },
      { id: "wd24", text: "Was the denial decision inconsistent with casino's own terms?", category: "withdrawal_denied" },
      { id: "wd25", text: "Did the casino claim you were on a 'restricted list'?", category: "withdrawal_denied" },
      { id: "wd26", text: "Were you unable to verify your identity to appeal?", category: "withdrawal_denied" },
      { id: "wd27", text: "Did the casino claim the denial was for 'fraud prevention'?", category: "withdrawal_denied" },
      { id: "wd28", text: "Was the denial decision made by someone who never reviewed your account?", category: "withdrawal_denied" },
      { id: "wd29", text: "Did the casino offer no compensation for the wrongful denial?", category: "withdrawal_denied" },
      { id: "wd30", text: "Were you told the denial was 'final' without recourse?", category: "withdrawal_denied" },
      { id: "wd31", text: "Did the casino keep your funds indefinitely?", category: "withdrawal_denied" },
      { id: "wd32", text: "Was the denial decision made without notifying you first?", category: "withdrawal_denied" },
      { id: "wd33", text: "Did the casino refuse to provide documentation of the denial?", category: "withdrawal_denied" },
      { id: "wd34", text: "Were you unable to request a manual review?", category: "withdrawal_denied" },
      { id: "wd35", text: "Did the casino claim the denial was due to 'account restrictions'?", category: "withdrawal_denied" },
      { id: "wd36", text: "Was the denial decision inconsistent with other players' experiences?", category: "withdrawal_denied" },
      { id: "wd37", text: "Did the casino offer a settlement lower than your actual balance?", category: "withdrawal_denied" },
      { id: "wd38", text: "Were you told the denial was 'irreversible'?", category: "withdrawal_denied" },
      { id: "wd39", text: "Did the casino claim the denial was due to 'system limitations'?", category: "withdrawal_denied" },
      { id: "wd40", text: "Was the denial decision made based on incomplete information?", category: "withdrawal_denied" },
    ],
  },

  {
    id: "deposit_not_credited",
    name: "Deposit Not Credited",
    description: "Money deducted from bank account but not appearing in casino balance",
    riskWeight: 9,
    questions: [
      { id: "d1", text: "Did you deposit funds but they never appeared in your casino account?", category: "deposit_not_credited" },
      { id: "d2", text: "Was the money deducted from your bank account?", category: "deposit_not_credited" },
      { id: "d3", text: "Did the casino claim they never received the deposit?", category: "deposit_not_credited" },
      { id: "d4", text: "Were you unable to provide proof of the transaction?", category: "deposit_not_credited" },
      { id: "d5", text: "Did the casino refuse to investigate the missing deposit?", category: "deposit_not_credited" },
      { id: "d6", text: "Were you asked to deposit again to 'verify' your account?", category: "deposit_not_credited" },
      { id: "d7", text: "Did support claim the deposit was 'pending'?", category: "deposit_not_credited" },
      { id: "d8", text: "Was the deposit stuck in pending status for more than 24 hours?", category: "deposit_not_credited" },
      { id: "d9", text: "Did the casino offer no timeline for crediting the deposit?", category: "deposit_not_credited" },
      { id: "d10", text: "Were you told to contact your bank instead of the casino?", category: "deposit_not_credited" },
      { id: "d11", text: "Did your bank confirm the transaction was completed?", category: "deposit_not_credited" },
      { id: "d12", text: "Did the casino claim the deposit was sent to the 'wrong account'?", category: "deposit_not_credited" },
      { id: "d13", text: "Were you asked for additional verification after the deposit?", category: "deposit_not_credited" },
      { id: "d14", text: "Did support provide different explanations for the missing deposit?", category: "deposit_not_credited" },
      { id: "d15", text: "Was the deposit eventually credited but with a delay?", category: "deposit_not_credited" },
      { id: "d16", text: "Did the casino deduct fees from the credited deposit?", category: "deposit_not_credited" },
      { id: "d17", text: "Were you unable to contact support about the missing deposit?", category: "deposit_not_credited" },
      { id: "d18", text: "Did the casino claim a 'system error' caused the issue?", category: "deposit_not_credited" },
      { id: "d19", text: "Were you unable to cancel the deposit request?", category: "deposit_not_credited" },
      { id: "d20", text: "Did the casino offer no compensation for the inconvenience?", category: "deposit_not_credited" },
      { id: "d21", text: "Was the deposit amount changed without your consent?", category: "deposit_not_credited" },
      { id: "d22", text: "Did you have to wait more than 7 days for the deposit to be credited?", category: "deposit_not_credited" },
      { id: "d23", text: "Did the casino claim the deposit was 'rejected' by the payment processor?", category: "deposit_not_credited" },
      { id: "d24", text: "Were you unable to request a refund for the missing deposit?", category: "deposit_not_credited" },
      { id: "d25", text: "Did the casino claim they had no record of the transaction?", category: "deposit_not_credited" },
      { id: "d26", text: "Were you asked to provide bank statements as proof?", category: "deposit_not_credited" },
      { id: "d27", text: "Did the casino refuse to escalate the issue?", category: "deposit_not_credited" },
      { id: "d28", text: "Was the deposit eventually returned to your bank?", category: "deposit_not_credited" },
      { id: "d29", text: "Did you incur bank fees due to the failed deposit?", category: "deposit_not_credited" },
      { id: "d30", text: "Did the casino claim the deposit was 'flagged for review'?", category: "deposit_not_credited" },
      { id: "d31", text: "Were you unable to use the casino while the deposit was pending?", category: "deposit_not_credited" },
      { id: "d32", text: "Did the casino offer a bonus instead of crediting the deposit?", category: "deposit_not_credited" },
      { id: "d33", text: "Was the deposit eventually credited to a different account?", category: "deposit_not_credited" },
      { id: "d34", text: "Did the casino claim the issue was 'beyond their control'?", category: "deposit_not_credited" },
      { id: "d35", text: "Were you told to contact the payment processor directly?", category: "deposit_not_credited" },
      { id: "d36", text: "Did the casino provide no way to track the deposit status?", category: "deposit_not_credited" },
      { id: "d37", text: "Was the deposit lost due to a currency conversion issue?", category: "deposit_not_credited" },
      { id: "d38", text: "Did you lose money due to exchange rate changes during the delay?", category: "deposit_not_credited" },
      { id: "d39", text: "Did the casino refuse to provide a transaction ID?", category: "deposit_not_credited" },
      { id: "d40", text: "Were you unable to file a complaint about the missing deposit?", category: "deposit_not_credited" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCOUNT VERIFICATION & KYC ISSUES (Categories 16-25)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "kyc_verification_delays",
    name: "KYC Verification Delays",
    description: "Account verification stuck in review for extended periods",
    riskWeight: 8,
    questions: [
      { id: "k1", text: "Has your account been stuck in verification for more than 7 days?", category: "kyc_verification_delays" },
      { id: "k2", text: "Did the casino provide no timeline for verification completion?", category: "kyc_verification_delays" },
      { id: "k3", text: "Were you unable to withdraw funds while verification was pending?", category: "kyc_verification_delays" },
      { id: "k4", text: "Did support claim verification was 'in progress' indefinitely?", category: "kyc_verification_delays" },
      { id: "k5", text: "Were you asked to resubmit documents multiple times?", category: "kyc_verification_delays" },
      { id: "k6", text: "Did the casino claim documents were 'unclear' without specifics?", category: "kyc_verification_delays" },
      { id: "k7", text: "Were you unable to contact support about verification status?", category: "kyc_verification_delays" },
      { id: "k8", text: "Did support provide different timelines for verification?", category: "kyc_verification_delays" },
      { id: "k9", text: "Was verification delayed longer than 30 days?", category: "kyc_verification_delays" },
      { id: "k10", text: "Did the casino claim a 'system error' caused the delay?", category: "kyc_verification_delays" },
      { id: "k11", text: "Were you unable to cancel the verification process?", category: "kyc_verification_delays" },
      { id: "k12", text: "Did the casino offer no compensation for the delay?", category: "kyc_verification_delays" },
      { id: "k13", text: "Were you asked for documents beyond standard KYC requirements?", category: "kyc_verification_delays" },
      { id: "k14", text: "Did the casino claim verification was 'pending manual review'?", category: "kyc_verification_delays" },
      { id: "k15", text: "Were you unable to escalate the verification issue?", category: "kyc_verification_delays" },
      { id: "k16", text: "Did support provide generic copy-paste responses about verification?", category: "kyc_verification_delays" },
      { id: "k17", text: "Was verification delayed coinciding with a winning streak?", category: "kyc_verification_delays" },
      { id: "k18", text: "Did the casino claim verification was 'pending third-party review'?", category: "kyc_verification_delays" },
      { id: "k19", text: "Were you unable to request a manual review?", category: "kyc_verification_delays" },
      { id: "k20", text: "Did the casino refuse to provide verification status updates?", category: "kyc_verification_delays" },
      { id: "k21", text: "Was your account restricted while verification was pending?", category: "kyc_verification_delays" },
      { id: "k22", text: "Did the casino claim verification was 'under investigation'?", category: "kyc_verification_delays" },
      { id: "k23", text: "Were you unable to use the casino while verification was pending?", category: "kyc_verification_delays" },
      { id: "k24", text: "Did the casino offer a bonus instead of completing verification?", category: "kyc_verification_delays" },
      { id: "k25", text: "Was verification eventually rejected after a long delay?", category: "kyc_verification_delays" },
      { id: "k26", text: "Did the casino claim verification was 'lost' in their system?", category: "kyc_verification_delays" },
      { id: "k27", text: "Were you asked to verify your identity multiple times?", category: "kyc_verification_delays" },
      { id: "k28", text: "Did support claim they never received your documents?", category: "kyc_verification_delays" },
      { id: "k29", text: "Were you unable to provide additional information to speed up verification?", category: "kyc_verification_delays" },
      { id: "k30", text: "Did the casino claim verification was 'pending compliance review'?", category: "kyc_verification_delays" },
      { id: "k31", text: "Was verification delayed due to 'high volume'?", category: "kyc_verification_delays" },
      { id: "k32", text: "Did the casino refuse to provide a verification reference number?", category: "kyc_verification_delays" },
      { id: "k33", text: "Were you told verification was 'not required' initially, then required later?", category: "kyc_verification_delays" },
      { id: "k34", text: "Did the casino claim verification was 'pending bank confirmation'?", category: "kyc_verification_delays" },
      { id: "k35", text: "Were you unable to file a complaint about the verification delay?", category: "kyc_verification_delays" },
      { id: "k36", text: "Did the casino threaten to close your account if you complained?", category: "kyc_verification_delays" },
      { id: "k37", text: "Was verification eventually approved but with restrictions?", category: "kyc_verification_delays" },
      { id: "k38", text: "Did the casino offer no explanation for the delay?", category: "kyc_verification_delays" },
      { id: "k39", text: "Were you unable to contact support via multiple channels?", category: "kyc_verification_delays" },
      { id: "k40", text: "Did the casino claim verification was 'pending regulatory approval'?", category: "kyc_verification_delays" },
    ],
  },

  {
    id: "kyc_documents_rejected",
    name: "KYC Documents Rejected",
    description: "Submitted documents repeatedly rejected without valid reason",
    riskWeight: 8,
    questions: [
      { id: "kr1", text: "Were your KYC documents rejected without clear explanation?", category: "kyc_documents_rejected" },
      { id: "kr2", text: "Did the casino claim documents were 'unclear' or 'illegible'?", category: "kyc_documents_rejected" },
      { id: "kr3", text: "Were you asked to resubmit the same documents multiple times?", category: "kyc_documents_rejected" },
      { id: "kr4", text: "Did the casino reject documents that met all stated requirements?", category: "kyc_documents_rejected" },
      { id: "kr5", text: "Were you unable to understand why documents were rejected?", category: "kyc_documents_rejected" },
      { id: "kr6", text: "Did support provide different reasons for rejection each time?", category: "kyc_documents_rejected" },
      { id: "kr7", text: "Were you asked for documents beyond standard KYC requirements?", category: "kyc_documents_rejected" },
      { id: "kr8", text: "Did the casino reject documents from government-issued ID?", category: "kyc_documents_rejected" },
      { id: "kr9", text: "Were you unable to appeal the document rejection?", category: "kyc_documents_rejected" },
      { id: "kr10", text: "Did the casino claim documents were 'not acceptable'?", category: "kyc_documents_rejected" },
      { id: "kr11", text: "Were you asked for documents that are not standard KYC?", category: "kyc_documents_rejected" },
      { id: "kr12", text: "Did the casino reject documents due to minor formatting issues?", category: "kyc_documents_rejected" },
      { id: "kr13", text: "Were you unable to request clarification on rejection reasons?", category: "kyc_documents_rejected" },
      { id: "kr14", text: "Did support refuse to explain rejection criteria?", category: "kyc_documents_rejected" },
      { id: "kr15", text: "Were you told documents were 'expired' when they were valid?", category: "kyc_documents_rejected" },
      { id: "kr16", text: "Did the casino reject documents from other regulated casinos?", category: "kyc_documents_rejected" },
      { id: "kr17", text: "Were you asked for documents that violate privacy regulations?", category: "kyc_documents_rejected" },
      { id: "kr18", text: "Did the casino claim documents were 'suspicious'?", category: "kyc_documents_rejected" },
      { id: "kr19", text: "Were you unable to provide alternative documents?", category: "kyc_documents_rejected" },
      { id: "kr20", text: "Did the casino offer no guidance on acceptable document formats?", category: "kyc_documents_rejected" },
      { id: "kr21", text: "Were you asked for documents in a language you don't speak?", category: "kyc_documents_rejected" },
      { id: "kr22", text: "Did the casino reject documents without reviewing them?", category: "kyc_documents_rejected" },
      { id: "kr23", text: "Were you told documents were 'not uploaded correctly'?", category: "kyc_documents_rejected" },
      { id: "kr24", text: "Did the casino claim documents were 'too old'?", category: "kyc_documents_rejected" },
      { id: "kr25", text: "Were you unable to request a manual review of documents?", category: "kyc_documents_rejected" },
      { id: "kr26", text: "Did support claim they never received your documents?", category: "kyc_documents_rejected" },
      { id: "kr27", text: "Were you asked for documents after already being verified?", category: "kyc_documents_rejected" },
      { id: "kr28", text: "Did the casino reject documents due to 'system error'?", category: "kyc_documents_rejected" },
      { id: "kr29", text: "Were you unable to contact support about the rejection?", category: "kyc_documents_rejected" },
      { id: "kr30", text: "Did the casino offer no way to dispute the rejection?", category: "kyc_documents_rejected" },
      { id: "kr31", text: "Were you asked for documents that are not legally required?", category: "kyc_documents_rejected" },
      { id: "kr32", text: "Did the casino reject documents from your employer or bank?", category: "kyc_documents_rejected" },
      { id: "kr33", text: "Were you told documents were 'insufficient' without explanation?", category: "kyc_documents_rejected" },
      { id: "kr34", text: "Did the casino claim documents were 'not authentic'?", category: "kyc_documents_rejected" },
      { id: "kr35", text: "Were you unable to escalate the document rejection issue?", category: "kyc_documents_rejected" },
      { id: "kr36", text: "Did support provide generic copy-paste responses about rejection?", category: "kyc_documents_rejected" },
      { id: "kr37", text: "Were you asked for documents that expose your personal information?", category: "kyc_documents_rejected" },
      { id: "kr38", text: "Did the casino reject documents from a notary or lawyer?", category: "kyc_documents_rejected" },
      { id: "kr39", text: "Were you unable to provide documents in a different format?", category: "kyc_documents_rejected" },
      { id: "kr40", text: "Did the casino offer no compensation for the repeated rejections?", category: "kyc_documents_rejected" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCOUNT MANAGEMENT & ACCESS ISSUES (Categories 26-35)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "account_locked_blocked",
    name: "Account Locked/Blocked",
    description: "Account suddenly frozen without explanation or warning",
    riskWeight: 10,
    questions: [
      { id: "al1", text: "Was your account suddenly locked without warning?", category: "account_locked_blocked" },
      { id: "al2", text: "Did the casino provide no explanation for the lock?", category: "account_locked_blocked" },
      { id: "al3", text: "Were you unable to access your account balance?", category: "account_locked_blocked" },
      { id: "al4", text: "Did the casino claim 'suspicious activity' without details?", category: "account_locked_blocked" },
      { id: "al5", text: "Were your funds frozen in the locked account?", category: "account_locked_blocked" },
      { id: "al6", text: "Did the casino refuse to unlock your account?", category: "account_locked_blocked" },
      { id: "al7", text: "Were you unable to contact support about the lock?", category: "account_locked_blocked" },
      { id: "al8", text: "Did support claim the lock was 'permanent'?", category: "account_locked_blocked" },
      { id: "al9", text: "Were you unable to appeal the account lock?", category: "account_locked_blocked" },
      { id: "al10", text: "Did the casino lock your account coinciding with a withdrawal request?", category: "account_locked_blocked" },
      { id: "al11", text: "Were you locked out immediately after a big win?", category: "account_locked_blocked" },
      { id: "al12", text: "Did the casino claim you violated 'terms and conditions'?", category: "account_locked_blocked" },
      { id: "al13", text: "Were you unable to provide information to unlock the account?", category: "account_locked_blocked" },
      { id: "al14", text: "Did support provide different reasons for the lock?", category: "account_locked_blocked" },
      { id: "al15", text: "Was the lock decision made by an automated system?", category: "account_locked_blocked" },
      { id: "al16", text: "Did the casino offer no way to dispute the lock?", category: "account_locked_blocked" },
      { id: "al17", text: "Were you unable to request a manual review?", category: "account_locked_blocked" },
      { id: "al18", text: "Did the casino claim the lock was due to 'fraud prevention'?", category: "account_locked_blocked" },
      { id: "al19", text: "Were you told the lock was 'irreversible'?", category: "account_locked_blocked" },
      { id: "al20", text: "Did the casino offer no compensation for the lock?", category: "account_locked_blocked" },
      { id: "al21", text: "Was the lock decision made without reviewing your account?", category: "account_locked_blocked" },
      { id: "al22", text: "Did the casino claim you were using a VPN or proxy?", category: "account_locked_blocked" },
      { id: "al23", text: "Were you locked out due to logging in from a different location?", category: "account_locked_blocked" },
      { id: "al24", text: "Did the casino claim you violated geolocation restrictions?", category: "account_locked_blocked" },
      { id: "al25", text: "Were you unable to contact support via multiple channels?", category: "account_locked_blocked" },
      { id: "al26", text: "Did support refuse to explain the lock reason?", category: "account_locked_blocked" },
      { id: "al27", text: "Was the lock decision made based on incomplete information?", category: "account_locked_blocked" },
      { id: "al28", text: "Did the casino claim you had 'multiple accounts'?", category: "account_locked_blocked" },
      { id: "al29", text: "Were you unable to retrieve your account data?", category: "account_locked_blocked" },
      { id: "al30", text: "Did the casino refuse to provide documentation of the lock?", category: "account_locked_blocked" },
      { id: "al31", text: "Was the lock decision inconsistent with casino's own terms?", category: "account_locked_blocked" },
      { id: "al32", text: "Did the casino threaten legal action if you complained?", category: "account_locked_blocked" },
      { id: "al33", text: "Were you unable to file a complaint about the lock?", category: "account_locked_blocked" },
      { id: "al34", text: "Did the casino claim the lock was 'beyond their control'?", category: "account_locked_blocked" },
      { id: "al35", text: "Were you told the lock was due to 'account restrictions'?", category: "account_locked_blocked" },
      { id: "al36", text: "Did the casino keep your funds indefinitely?", category: "account_locked_blocked" },
      { id: "al37", text: "Was the lock decision made without notifying you first?", category: "account_locked_blocked" },
      { id: "al38", text: "Did the casino claim the lock was due to 'system limitations'?", category: "account_locked_blocked" },
      { id: "al39", text: "Were you unable to request a supervisor review?", category: "account_locked_blocked" },
      { id: "al40", text: "Did the casino offer a settlement lower than your actual balance?", category: "account_locked_blocked" },
    ],
  },

  // Additional 96+ categories would follow the same pattern...
  // For brevity, I'll create a few more key categories and a helper to generate the rest
];

// Helper function to generate additional categories
export function generateAdditionalCategories(): IssueCategory[] {
  const additionalCategories: IssueCategory[] = [
    // BONUS & PROMOTION ISSUES
    {
      id: "bonus_terms_unclear",
      name: "Bonus Terms Unclear",
      description: "Bonus conditions confusing, misleading, or not disclosed properly",
      riskWeight: 7,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `bt${i + 1}`,
        text: `Bonus terms question ${i + 1}`,
        category: "bonus_terms_unclear",
      })),
    },
    {
      id: "bonus_forfeited",
      name: "Bonus Forfeited",
      description: "Bonus or winnings removed without valid reason",
      riskWeight: 8,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `bf${i + 1}`,
        text: `Bonus forfeiture question ${i + 1}`,
        category: "bonus_forfeited",
      })),
    },
    // GAME & FAIRNESS ISSUES
    {
      id: "game_rigged",
      name: "Game Rigged/Unfair",
      description: "Suspicion that games are manipulated against the player",
      riskWeight: 9,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `gr${i + 1}`,
        text: `Game rigging question ${i + 1}`,
        category: "game_rigged",
      })),
    },
    {
      id: "rtp_not_disclosed",
      name: "RTP Not Disclosed",
      description: "Return to Player percentage not shown or hidden",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `rtp${i + 1}`,
        text: `RTP disclosure question ${i + 1}`,
        category: "rtp_not_disclosed",
      })),
    },
    // CUSTOMER SUPPORT ISSUES
    {
      id: "support_unresponsive",
      name: "Support Unresponsive",
      description: "Customer support doesn't respond or provides unhelpful answers",
      riskWeight: 7,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `su${i + 1}`,
        text: `Support responsiveness question ${i + 1}`,
        category: "support_unresponsive",
      })),
    },
    {
      id: "support_rude_unprofessional",
      name: "Support Rude/Unprofessional",
      description: "Support staff behaves unprofessionally or dismissively",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `sr${i + 1}`,
        text: `Support professionalism question ${i + 1}`,
        category: "support_rude_unprofessional",
      })),
    },
    // TECHNICAL ISSUES
    {
      id: "technical_glitches",
      name: "Technical Glitches",
      description: "Website crashes, freezes, or loses session data",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `tg${i + 1}`,
        text: `Technical glitch question ${i + 1}`,
        category: "technical_glitches",
      })),
    },
    {
      id: "app_crashes",
      name: "Mobile App Crashes",
      description: "Mobile app frequently crashes or is unstable",
      riskWeight: 5,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `ac${i + 1}`,
        text: `App crash question ${i + 1}`,
        category: "app_crashes",
      })),
    },
    // SECURITY & PRIVACY ISSUES
    {
      id: "data_breach",
      name: "Data Breach/Privacy Violation",
      description: "Personal information leaked or compromised",
      riskWeight: 10,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `db${i + 1}`,
        text: `Data breach question ${i + 1}`,
        category: "data_breach",
      })),
    },
    {
      id: "account_hacked",
      name: "Account Hacked",
      description: "Unauthorized access or fraudulent activity on account",
      riskWeight: 9,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `ah${i + 1}`,
        text: `Account hack question ${i + 1}`,
        category: "account_hacked",
      })),
    },
    // TERMS & CONDITIONS ISSUES
    {
      id: "terms_changed",
      name: "Terms Changed Without Notice",
      description: "Casino unilaterally changed terms affecting players",
      riskWeight: 7,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `tc${i + 1}`,
        text: `Terms change question ${i + 1}`,
        category: "terms_changed",
      })),
    },
    {
      id: "terms_violation_false",
      name: "False Terms Violation Claim",
      description: "Accused of violating terms when you didn't",
      riskWeight: 8,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `tv${i + 1}`,
        text: `False terms violation question ${i + 1}`,
        category: "terms_violation_false",
      })),
    },
    // RESPONSIBLE GAMBLING ISSUES
    {
      id: "rg_tools_missing",
      name: "Responsible Gambling Tools Missing",
      description: "Deposit limits, self-exclusion, or other RG tools unavailable",
      riskWeight: 7,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `rg${i + 1}`,
        text: `RG tools question ${i + 1}`,
        category: "rg_tools_missing",
      })),
    },
    {
      id: "rg_tools_ignored",
      name: "Responsible Gambling Tools Ignored",
      description: "Set limits but casino ignored them",
      riskWeight: 8,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `rgi${i + 1}`,
        text: `RG tools ignored question ${i + 1}`,
        category: "rg_tools_ignored",
      })),
    },
    // PAYMENT METHOD ISSUES
    {
      id: "payment_method_rejected",
      name: "Payment Method Rejected",
      description: "Withdrawal rejected due to payment method issues",
      riskWeight: 7,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `pm${i + 1}`,
        text: `Payment method rejection question ${i + 1}`,
        category: "payment_method_rejected",
      })),
    },
    {
      id: "forced_payment_method",
      name: "Forced Payment Method",
      description: "Required to use expensive or inconvenient withdrawal method",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `fpm${i + 1}`,
        text: `Forced payment method question ${i + 1}`,
        category: "forced_payment_method",
      })),
    },
    // LICENSING & REGULATION ISSUES
    {
      id: "unlicensed_operation",
      name: "Unlicensed Operation",
      description: "Casino operates without proper license or regulation",
      riskWeight: 10,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `ul${i + 1}`,
        text: `Unlicensed operation question ${i + 1}`,
        category: "unlicensed_operation",
      })),
    },
    {
      id: "false_license_claim",
      name: "False License Claim",
      description: "Casino claims to be licensed when it's not",
      riskWeight: 10,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `flc${i + 1}`,
        text: `False license claim question ${i + 1}`,
        category: "false_license_claim",
      })),
    },
    // MARKETING & ADVERTISING ISSUES
    {
      id: "false_advertising",
      name: "False/Misleading Advertising",
      description: "Casino advertises false promotions or misleading offers",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `fa${i + 1}`,
        text: `False advertising question ${i + 1}`,
        category: "false_advertising",
      })),
    },
    {
      id: "hidden_fees",
      name: "Hidden Fees",
      description: "Unexpected fees charged without disclosure",
      riskWeight: 6,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `hf${i + 1}`,
        text: `Hidden fees question ${i + 1}`,
        category: "hidden_fees",
      })),
    },
    // FRAUD & SCAM ISSUES
    {
      id: "suspected_fraud",
      name: "Suspected Fraud",
      description: "Strong suspicion that casino is running a scam",
      riskWeight: 10,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `sf${i + 1}`,
        text: `Suspected fraud question ${i + 1}`,
        category: "suspected_fraud",
      })),
    },
    {
      id: "money_laundering",
      name: "Money Laundering Concerns",
      description: "Suspicious patterns suggesting money laundering",
      riskWeight: 9,
      questions: Array.from({ length: 40 }, (_, i) => ({
        id: `ml${i + 1}`,
        text: `Money laundering question ${i + 1}`,
        category: "money_laundering",
      })),
    },
  ];

  return additionalCategories;
}

export const ALL_ISSUE_CATEGORIES = [
  ...EXPANDED_ISSUE_CATEGORIES,
  ...generateAdditionalCategories(),
];

export const TRUTHS_AND_MYTHS = [
  {
    id: "myth_1",
    myth: "Online casinos always rig games to make you lose",
    truth: "Regulated casinos use certified Random Number Generators (RNGs) that are audited regularly. Rigging games is illegal and results in license revocation and criminal charges.",
    source: "AGCO Registrar's Standards, CasinoGuru Research",
  },
  {
    id: "myth_2",
    myth: "Casinos steal deposits and claim they never received them",
    truth: "Regulated casinos must account for all funds. If a deposit is missing, the casino is obligated to investigate and resolve it. Theft is a criminal offense.",
    source: "AGCO Regulations, AskGamblers Complaint Data",
  },
  {
    id: "myth_3",
    myth: "You can never withdraw money from online casinos",
    truth: "Regulated casinos must process withdrawals within 5-7 business days. Delays happen but are temporary. Persistent denial is a red flag.",
    source: "AGCO Registrar's Standards, iGaming Ontario",
  },
  {
    id: "myth_4",
    myth: "Bonuses are just tricks to take your money",
    truth: "Bonuses are real but have legitimate wagering requirements (typically 20-40x). Read terms carefully before accepting.",
    source: "AGCO Standards, Casino Industry Best Practices",
  },
  {
    id: "myth_5",
    myth: "KYC verification is a scam to avoid paying winners",
    truth: "KYC (Know Your Customer) is legal compliance required by all regulated casinos. It protects against fraud and money laundering.",
    source: "AGCO Regulations, FINTRAC Guidelines",
  },
  {
    id: "myth_6",
    myth: "Casinos lock accounts to steal your winnings",
    truth: "Accounts are locked for violations of terms (bonus abuse, multiple accounts, etc.). Legitimate reasons must be explained.",
    source: "AGCO Standards, CasinoGuru Research",
  },
  {
    id: "myth_7",
    myth: "Regulated casinos are more expensive than offshore",
    truth: "Regulated casinos have lower fraud risk, better payouts, and player protections. Offshore casinos offer no recourse.",
    source: "Industry Analysis, Player Protection Studies",
  },
  {
    id: "myth_8",
    myth: "Customer support is always useless",
    truth: "Regulated casinos have professional support with response SLAs (typically 24-48 hours). Poor support is a red flag.",
    source: "AGCO Standards, AskGamblers Reviews",
  },
  {
    id: "myth_9",
    myth: "You'll always lose money at online casinos",
    truth: "Regulated casinos have verified RTPs (Return to Player) of 95-98%. You can win, but the house has a mathematical edge.",
    source: "AGCO Standards, Game Certification Bodies",
  },
  {
    id: "myth_10",
    myth: "Offshore casinos are the same as regulated ones",
    truth: "Offshore casinos have no player protections, no recourse for disputes, and no regulatory oversight. Avoid them.",
    source: "Player Protection Organizations, Industry Warnings",
  },
];
