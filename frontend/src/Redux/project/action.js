import * as types from "./actionTypes";
import axios from "axios";
import { getItemFromLocal } from "../../utils/localStorage";


const token = getItemFromLocal("token");
console.log(token);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "Access-Control-Allow-Credentials": true
};




export const getProject = (params) => (dispatch) => {
  dispatch({ type: types.GET_PROJECT_REQUEST });
  return axios({
    method: "get",
    url: `/app/projects`,
    params: params,
    headers: headers,
  })
    .then((res) => {
      console.log("res",res)
      dispatch({ type: types.GET_PROJECT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_PROJECT_FAILURE });
    });
};


export const getSingleProject = (id) => (dispatch) => {
    dispatch({ type: types.GET_PROJECT_REQUEST });
    return axios({
      method: "get",
      url: `/app/projects/${id}`,
      headers: headers,
    })
      .then((res) => {
        dispatch({ type: types.GET_PROJECT_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: types.GET_PROJECT_FAILURE });
      });
  };
  


export const addProject = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_PROJECT_REQUEST });

  return axios({
    method: "post",
    url: `/app/projects/create`,
    data: payload,
    headers: headers,
  })
    .then((res) => {
      return dispatch({ type: types.ADD_PROJECT_SUCCESS,payload:res.data });
    })
    .catch((err) => {
      dispatch({ type: types.ADD_PROJECT_FAILURE });
    });
};




export const updateProject = (payload,id) => (dispatch) => {
    dispatch({type:types.UPDATE_PROJECT_REQUEST})
    return axios({
        method: "patch",
        url: `/app/projects/edit/${id}`,
        data: payload,
        headers: headers,
      })
    .then((r) => {
        return dispatch({type:types.UPDATE_PROJECT_SUCCESS})
    })
    .catch((err) => {
        dispatch({type:types.UPDATE_PROJECT_FAILURE})
    })
}


export const deleteProject = (id) => (dispatch) => {
    dispatch({type:types.DELETE_PROJECT_REQUEST})

    return axios({
        method: "delete",
        url: `/app/projects/delete/${id}`,
        headers: headers,
      })
    .then((r) => {
       return dispatch({type:types.DELETE_PROJECT_SUCCESS})
    })
    .catch((err) => {
        dispatch({type:types.DELETE_PROJECT_FAILURE})
    })
}




