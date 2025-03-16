import { gql } from "graphql-request";
import { gql_client } from "./helpers";
import { IRegistrationPayload } from "@/types";

// user actions

const handleLoginAction = async (data: { email: string; password: string }) => {
  try {
    const query = gql`
      query LOGIN($logindata: LoginInput) {
        loginWithEmail(data: $logindata) {
          message
          user {
            _id
            email
            email_verified
            first_name
            last_name
            avatar {
              url
            }
            recomendation {
              Hostel
              PG
              flat
              city
            }
            role
            phone_no
            createdAt
          }
          token
        }
      }
    `;
    const variables = {
      logindata: {
        ...data,
      },
    };
    const res = await gql_client.request(query, variables);
    return res;
  } catch (error: any) {
    console.log("err occurred while login:", error.response.errors[0].message);
    return error.response.errors[0].message;
  }
};

const HandleSignInAction = async (data: { token: string; role?: string }) => {
  try {
    const query = gql`
      mutation SignInMutation($data: SignInInput) {
        SignIn(data: $data) {
          message
          user {
            _id
            email
            email_verified
            first_name
            last_name
            avatar {
              url
            }
            recomendation {
              Hostel
              PG
              flat
              city
            }
            role
            phone_no
            createdAt
          }
          token
        }
      }
    `;
    const variables = {
      data,
    };
    const res = await gql_client.request(query, variables);
    return res;
  } catch (error: any) {
    console.log("err occurred while login:", JSON.stringify(error, null, 2));
    return error.response.errors[0].message;
  }
};

const handleRegistrationAction = async (data: IRegistrationPayload) => {
  try {
    const query = gql`
      mutation Registration($registationdata: RegisterInput) {
        register(data: $registationdata) {
          message
          user {
            _id
            email
            email_verified
            first_name
            last_name
            avatar {
              url
            }
            recomendation {
              Hostel
              PG
              flat
              city
            }
            role
            phone_no
            createdAt
          }
          token
        }
      }
    `;
    const variables = {
      registationdata: { ...data },
    };

    const res = await gql_client.request(query, variables);
    return res;
  } catch (error: any) {
    console.log(
      "err occurred while registration:",
      error.response.errors[0].message
    );
    return error.response.errors[0].message;
  }
};

const handleFetchUserProfile = async (token: string) => {
  try {
    const query = gql`
      query GetUserProfile {
        fetchUserProfile {
          user {
            _id
            email
            email_verified
            first_name
            last_name
            avatar {
              url
            }
            recomendation {
              Hostel
              PG
              flat
              city
            }
            role
            phone_no
            createdAt
          }
          token
        }
      }
    `;

    const resp: any = await gql_client.setHeader("token", token).request(query);
    return resp.fetchUserProfile;
  } catch (error: any) {
    console.log(
      "err occured while fetching user profile:",
      error.response.errors[0].message
    );
    return error.response.errors[0].message;
  }
};

const handleOTPVerify = async (email: string, otp: string) => {
  try {
    const query = gql`
      query VERIFYACCOUNT($email: String!, $otp: String) {
        verifyAcount(email: $email, otp: $otp)
      }
    `;
    const variables = {
      email,
      otp,
    };

    const res: any = await gql_client.request(query, variables);
    return res.verifyAcount;
  } catch (error: any) {
    console.log(
      "err occured while verifying otp:",
      error.response.errors[0].message
    );
    return error.response.errors[0].message;
  }
};

const HandleOTPResendAction = async (email: string) => {
  try {
    const query = gql`
      query ResendEmail($email: String!) {
        resendEmail(email: $email)
      }
    `;

    const variables = {
      email,
    };

    const res: any = await gql_client.request(query, variables);
    return res.resendEmail;
  } catch (error: any) {
    console.log(
      "err occured while resending otp:",
      error.response.errors[0].message
    );
    return error.response.errors[0].message;
  }
};

const handleProfileUpdateAction = async (data: any, token: string) => {
  try {
    const query = gql`
      mutation UpdateUserProfile($dataToUpdate: UpdateProfileInput) {
        updateProfile(data: $dataToUpdate) {
          user {
            _id
            email
            email_verified
            first_name
            last_name
            avatar {
              public_id
              url
            }
            recomendation {
              Hostel
              PG
              flat
              city
            }
            role
            phone_no
            createdAt
          }
          message
          token
        }
      }
    `;
    const variables = {
      dataToUpdate: {
        ...data,
      },
    };

    const res: any = await gql_client
      .setHeader("token", token)
      .request(query, variables);
    return {
      success: true,
      res,
    };
  } catch (error: any) {
    console.log(
      "err occured while updating profile:",
      error.response.errors[0].message
    );
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

const handleForgotPasswordAction = async (email: string) => {
  try {
    const query = gql`
      query handleForgotPassword($email: String!) {
        forgotPassword(email: $email)
      }
    `;
    const variables = {
      email,
    };

    const res: any = await gql_client.request(query, variables);

    return {
      success: true,
      res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

const handlePasswordResetAction = async (data: any) => {
  try {
    const query = gql`
      query ResetPassword($data: PasswordResetInput) {
        resetPassword(data: $data)
      }
    `;

    const variables = {
      data: { ...data },
    };

    const res = await gql_client.request(query, variables);
    return {
      success: true,
      res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

// listing acttions
const handleFetchListings = async () => {
  try {
    const query = gql`
      query GetAllListing {
        listings {
          listings {
            _id
            name
            banners {
              public_id
              url
            }
            category {
              name
              image {
                url
              }
            }
            video {
              public_id
              url
            }
            is_call_allowed
            extra {
              main_city
              details
              distance {
                railway_station
                mall
                library
                medical_shop
              }
              for_all
              for_boys
              for_family
              for_girls
            }
            opening_time
            closing_time
            monthly_rent
            electricity_cost
            address
            contact_no
            facilities

            owner {
              _id
              first_name
              last_name
              email
              phone_no
              avatar {
                url
              }
            }
            createdAt
          }
        }
      }
    `;

    const res = await gql_client.request(query);

    return {
      success: true,
      res,
    };
  } catch (error: any) {
    console.log("err while fetching listing:", error);
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

// category actions

const handleGetAllCategories = async () => {
  try {
    const query = gql`
      query GetAllCategory {
        categories(limit: 20) {
          _id
          name
          image {
            public_id
            url
          }
          creator {
            _id
          }
        }
      }
    `;
    const res: any = await gql_client.request(query);
    return {
      success: true,
      res,
    };
  } catch (error: any) {
    console.log(error.response.errors[0].message);
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

// notofication actions

const handleGetUserNotifications = async (token: string) => {
  try {
    const query = gql`
      query GETUSRNOtification {
        getAllNotifications(limit: 10) {
          _id
          unreaded
          title
          description
          createdAt
          updatedAt
        }
      }
    `;
    const res = await gql_client.setHeader("token", token).request(query);
    return {
      success: true,
      res,
    };
  } catch (error: any) {
    console.log(
      "err occured while  geting user notification:",
      error.response.errors[0].message
    );
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

const handleNotificationStatus = async (id: string, token: string) => {
  try {
    const query = gql`
      mutation updateNotification {
        updateNotification(ID: id) {
          _id
          unreaded
          title
          description
          createdAt
          updatedAt
        }
      }
    `;

    const res = await gql_client.setHeader("token", token).request(query);
    return res;
  } catch (error: any) {
    console.log(
      "err occured while  updating user notification:",
      error.response.errors[0].message
    );
    return {
      success: false,
      message: error.response.errors[0].message,
    };
  }
};

export {
  handleLoginAction,
  handleRegistrationAction,
  handleFetchUserProfile,
  handleOTPVerify,
  HandleOTPResendAction,
  handleFetchListings,
  handleProfileUpdateAction,
  handleGetUserNotifications,
  handleNotificationStatus,
  handleGetAllCategories,
  handleForgotPasswordAction,
  handlePasswordResetAction,
  HandleSignInAction,
};
