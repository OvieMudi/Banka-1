const customErrorMessages = {
  numeric: 'Please input only numbers for :attribute.',
  digits: ':attribute should be :digits digits long.',
  min: 'The :attribute should not be less than :min characters.',
  max: 'The :attribute should not be more than :max characters.',
  required: ':attribute can not be empty',
  email: 'Please input a valid email address',
  alpha_dash: ':attribute can only contain any of the following: aplphabets, numbers, underscores and dashes',
  alpha: 'Please input only letters for :attribute.',
  boolean: ':attribute should be true or false.',
  in: ':attribute should be one of the following: :in.',
};

export default customErrorMessages;
