import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import KarbaranSidebarContent from "./KarbaranSidebarContent";
import KarbaranHeader from "./KarbaranHeader";
import { getKarbaran } from "./store/karbaranSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
  },
}));

function KarbaranApp(prop) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useDeepCompareEffect(() => {
    dispatch(getKarbaran());
    // dispatch(getMarakez());
  }, [dispatch]);

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);

  return (
    <Root
      header={<KarbaranHeader pageLayout={pageLayout} />}
      // content={}
      ref={pageLayout}
      rightSidebarContent={<KarbaranSidebarContent />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("karbaranApp", reducer)(KarbaranApp);
