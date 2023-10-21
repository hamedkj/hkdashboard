import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Typography } from "@mui/material";
import {
  addKarbar,
  getKarbar,
  newKarbar,
  removeKarbar,
  selectkarbar,
  updateKarbar,
} from "../store/karbarSlice";


// import { selectCountries } from '../store/countriesSlice';
// import { selectTags } from '../store/tagsSlice';
// import ContactEmailSelector from './email-selector/ContactEmailSelector';
// import PhoneNumberSelector from './phone-number-selector/PhoneNumberSelector';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("شما باید یک نام وارد کنید"),
});

function KarbarForm(props) {
  const karbar = useSelector(selectkarbar);
  //   const countries = useSelector(selectCountries);
  //   const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  useEffect(() => {
    if (routeParams.id === "new") {
      dispatch(newKarbar());
    } else {
      dispatch(getKarbar(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...karbar });
  }, [karbar, reset]);

  //   function getCountryByIso(iso) {
  //     return countries.find((country) => country.iso === iso);
  //   }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (routeParams.id === "new") {
      dispatch(addKarbar(data)).then(({ payload }) => {
        navigate(`/apps/karbaran/${payload.id}`);
      });
    } else {
      dispatch(updateKarbar(data));
    }
  }

  function handleRemovekarbar() {
    dispatch(removeKarbar(karbar.id)).then(() => {
      navigate("/apps/karbaran");
    });
  }

  //   if (_.isEmpty(form) || !karbar) {
  //     return <FuseLoading />;
  //   }

  return <Typography>Hamed</Typography>;
}

export default KarbarForm;
