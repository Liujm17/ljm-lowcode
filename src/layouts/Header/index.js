import {useContext, useState, useCallback, useEffect} from "react";
import "./index.scss";
import classnames from "../../utils/classname";
import {CanvasContext} from "../../Context";
import Tpl from "./Tpl";

export default function Header(props) {
  const [showTpl, setShowTpl] = useState(false);
  const globalCanvas = useContext(CanvasContext);

  const prevCanvas = () => {
    globalCanvas.goPrevCanvasHistory();
  };

  const nextCanvas = () => {
    globalCanvas.goNextCanvasHistory();
  };

  const openOrCloseTpl = useCallback(() => {
    setShowTpl(!showTpl);
  }, [showTpl]);

  const emptyCanvas = () => {
    globalCanvas.emptyCanvas();
  };

  const release = () => {
    console.log(
      "发布",
      globalCanvas.getCanvasData(),
      JSON.stringify(globalCanvas.getCanvasData())
    ); //sy-log
  };

  return (
    <>
      <ul className='mainHeader'>
        <li className='item' onClick={openOrCloseTpl}>
          <span
            className={`${"iconfont icon-xuanze"} ${
              'chooseTemplateIcon'
            }`}></span>
          <span className='txt'>选择模板</span>
        </li>
        <li className='item' onClick={prevCanvas}>
          <span
            className={classnames(
              "iconfont icon-chexiaofanhuichehuishangyibu",
              'lastStep'
            )}></span>
          <span className='txt'>上一步</span>
        </li>
        <li className='item' onClick={nextCanvas}>
          <span
            className={classnames(
              "iconfont icon-chexiaofanhuichehuishangyibu",
              'nextStep'
            )}></span>
          <span className='txt'>下一步</span>
        </li>

        <li className='item' onClick={emptyCanvas}>
          <span
            className={classnames(
              "iconfont icon-qingkong",
              'clearCanvasIcon'
            )}></span>
          <span className='txt'>清空画布</span>
        </li>
        <li
          className={classnames('item','release')}
          onClick={release}>
          <span
            className={classnames(
              "iconfont icon-fabu",
              'releaseIcon'
            )}></span>
          <span className='txt'>发布</span>
        </li>
        {/* <li className={styles.item}>下架</li> */}
      </ul>
      {showTpl && (
        <Tpl openOrCloseTpl={openOrCloseTpl} globalCanvas={globalCanvas} />
      )}
    </>
  );
}
