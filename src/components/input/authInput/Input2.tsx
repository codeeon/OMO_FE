// import * as React from 'react';
// import styled from 'styled-components';
// import { UseFormRegister } from 'react-hook-form';

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface Password {
//   password: string;
//   confirmedPassword: string;
// }

// interface NewPassword {
//   newPassword: string;
//   confirmedPassword: string;
// }

// interface InputProps {
//   placeholder: string;
//   type: string;
//   value?: string;
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   autoComplete?: string;
//   $width?: string;
//   $check?: string;
//   register?:
//     | UseFormRegister<LoginData>
//     | UseFormRegister<NewPassword>
//     | UseFormRegister<Password>;
// }

// const Input2 = (props: InputProps) => {
//   const {
//     placeholder,
//     type,
//     value,
//     onChange,
//     autoComplete,
//     $width,
//     $check,
//     register,
//   } = props;

//   const check = $check ? $check : 'default';

//   return (
//     <Input
//       placeholder={placeholder}
//       type={type}
//       value={value}
//       onChange={onChange}
//       autoComplete={autoComplete}
//       $width={$width}
//       className={check}
//       {...register}
//     />
//   );
// };

// export default Input2;

// const Input = styled.input<{ $width?: string }>`
//   width: ${({ $width }) => $width || '400px'};
//   color: ${({ theme }) => theme.color.text};
//   height: 50px;
//   flex-shrink: 0;
//   border-radius: 4px;
//   border: 1px solid ${({ theme }) => theme.color.border};
//   background: none;
//   padding: 0 15px;
//   box-sizing: border-box;
//   &::placeholder {
//     color: ${({ theme }) => theme.color.sub2};
//     font-size: 14px;
//     font-weight: 700;
//   }

//   // 상태에 대한 클래스를 도입 - className에 기입
//   &.rejected {
//     border-color: #ff3263;
//   }
//   &.confirmed {
//     border-color: #0bd961;
//   }
//   &.default {
//     border-color: #d9d9d9;
//   }
// `;

// // const Input = styled.input<{ $width: string; $check: string }>`
// //   width: ${({ $width }) => $width || '400px'};
// //   color: ${({ theme }) => theme.color.text};
// //   height: 50px;
// //   flex-shrink: 0;
// //   border-radius: 4px;
// //   border: 1px solid ${({ theme }) => theme.color.border};
// //   border-color: ${({ $check }) =>
// //     $check === 'rejected'
// //       ? 'var(--error_accent, #FF3263)'
// //       : $check === 'confirmed'
// //       ? '#0BD961'
// //       : '#D9D9D9'};
// //   background: none;
// //   padding: 0 15px;
// //   &::placeholder {
// //     color: ${({ theme }) => theme.color.sub2};
// //     font-size: 14px;
// //     font-weight: 700;
// //   }
// //   box-sizing: border-box;
// // `;
