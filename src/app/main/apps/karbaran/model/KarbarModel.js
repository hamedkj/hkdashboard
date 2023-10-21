import _ from "@lodash";

const KarbarModel = (data) =>
  _.defaults(data || {}, {
    avatar: null,
    background: null,
    userName: "",
    name: "",
    phone: "",
    markaz: [],
    userType: [],
    IsActive: true,
  });

export default KarbarModel;
