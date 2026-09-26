export const authError = (body) => {
  const error = body?.error ?? body?.view?.onOpenAlarm?.error;
  if (!error) return null;
  return {
    code: typeof error.code === 'string' ? error.code : undefined,
    description: [error.desc, error.label].find((value) => typeof value === 'string' && value.trim())?.trim(),
  };
};

export const smsRequested = (body) =>
  !authError(body) && typeof body?.view?.code === 'string' && body.view.code.endsWith('EnterOtp');
