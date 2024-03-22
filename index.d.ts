/**
 * https://bimface.com/docs/model-viewer/v1/api-reference/BimfaceSDKLoader.html
 */


type TViewer = Glodon.Bimface.Viewer.Viewer3D | Glodon.Bimface.Viewer.ViewerGIS;

type TPosition = { x: number, y: number, z: number };
type TVector = { x: number, y: number, z: number };
type TLatLon = { lat: number, lon: number, alt: number };
type TPoint = {} | Object;

type TRange = { min: number, max: number };

type TArea = {
    /**
     * 平面的类型，"rectangle"为矩形, "polygon"为多边形, "circle"为圆
     */
    type: "rectangle" | "polygon" | "circle",

    /**
     * 平面的边界点，type为"rectangle"时, points值为[minpt，maxpt], 对应平面的起始点和结束点；type为"polygon"时, points值为[p1, p2, p3, ...], 点数大于等于3且首尾不可重复
     */
    points?: Array<TPoint>,

    /**
     * 中心点, 仅当type为"circle"时有效, 默认值为：{x: 0, y: 0, z: 0}
     */
    center?: TPosition,

    /**
     * 半径, 仅当type为"circle"时有效, 根据viewer判断单位, 若为viewer3D，则单位与场景设置单位一致, 若为viewerGIS, 则单位为m
     */
    radius?: number
};

type TGlowEffectOptions = {
    /**
     * 发光效果类型，“body”为整体发光，“outline”为轮廓线发光，默认为“body”
     */
    type?: "body" | "outline",

    /**
     * 发光效果颜色
     */
    color: Glodon.Web.Graphics.Color,

    /**
     * 发光强度，取值范围[0,1]，默认值为0.3
     */
    intensity?: number,

    /**
     * 扩散程度，取值范围[1,5]，默认值为3
     */
    spread?: number
}

type TComponentCondition = {
    /**
     * 由要素ID组成的数组
     */
    ids: Array<string>,

    /**
     * 由要素objectData组成的数组
     */
    objectData: Array<Object>,

    /**
     * 全部要素
     */
    all: boolean
}

type TFeatureCondition = {
    /**
     * 由要素ID组成的数组
     */
    ids: Array<string>,

    /**
     * 由要素objectData组成的数组
     */
    objectData: Array<Object>,

    /**
     * 全部要素
     */
    all: boolean
}

type TEffectCondition = {
    /**
    * 	由对象ID组成的数组，若传入文件夹ID，将删除文件夹及文件夹下的所有内容
    */
    ids: Array<string>,

    /**
     * 效果类型
     */
    type: Glodon.Bimface.Common.Type.EffectType,

    /**
     * 是否释放对应的效果对象资源，默认为false
     */
    all: boolean
}

type TBlinkOption = {
    color: Glodon.Web.Graphics.Color,
    /**
     * 闪烁间隔时间（毫秒），为空时使用默认时间
     */
    interval?: number,

    /**
     * 闪烁次数，为空时默认不限次数
     */
    times?: number
}

type ViewMetaData = {
    APIHost: string,
    bake: any,
    componentSegmentDataBagId: any,
    config: {
        bimtilesVersion: string
        texture: string
        toBimtiles: string
    },
    dataEnvType: "BIMFACE"
    databagId: string
    extractType: any
    integrateDrawings: any
    isSupportComponentProperty: boolean
    isSupportDrawing: boolean
    isSupportFamilyTypeList: boolean
    isSupportMaterialProperty: boolean
    isSupportMiniMap: boolean
    isSupportModelTree: boolean
    isSupportRoomArea: boolean
    isSupportWalk: boolean
    jsSDKVersion: string
    loadMode: string
    modelId: number
    modelType: string
    moduleData: any
    name: string
    renderType: string
    renderVersion: string
    sceneJsonInfo: any
    sdkPath?: string
    shell: any
    split: any
    staticHost: string
}

/**
 * BIMFACE SDK加载器
 */
declare class BimfaceSDKLoader {
    load(option: BimfaceSDKLoaderConfig, successCallback: (viewMetaData: ViewMetaData) => void, failureCallback: (error: any) => void): void;
}

/**
 * BIMFACE SDK 加载器配置项
 */
declare class BimfaceSDKLoaderConfig {
    /**
     * API URL
     */
    APIHost: String

    /**
     *  语言版本：zh_CN - 中文版；en_GB - 英文版；sv_SE - 瑞典版；zh_TW - 繁体中文版
     */
    language: "zh_CN" | "en_GB" | "sv_SE" | "zh_TW"

    /**
     * 静态资源地址
     */
    staticHost: String

    /**
     * ViewToken信息
     */
    viewToken: String

    /**
     * 默认为BimfaceViewTypeOption.Normal，通过viewToken自动判断viewType。仅在加载rvt模型中的图纸时需指定为BimfaceViewTypeOption.DrawingView（指定后无需判断viewMetaData中的viewType）
     */
    viewType: String

    /**
     * 显示效果，可选值Normal、Bake，默认为Bake
     */
    visualStyle: "Normal" | "Bake"
}

declare namespace Glodon {
    const Version: string

    namespace Bimface {

        namespace Analysis {
            class AnalysisBase {
                /**
                 * 清除分析对象
                 */
                destroy(): void;

                /**
                 * 显示分析对象
                 */
                show(): void;

                /**
                 * 隐藏分析对象
                 */
                hide(): void;

                /**
                 * 更新设置
                 */
                update(): void;
            }
            namespace CutFill {

                /**
                 * 填挖方对象类
                 */
                class CutFillAnalysis extends AnalysisBase {
                    /**
                     * 
                     * @param cutFillAnalysisConfig 填挖方对象的配置项
                     */
                    constructor(cutFillAnalysisConfig: CutFillAnalysisConfig);

                    /**
                     * 获取填挖方的边界
                     */
                    getBoundary(): Array<TPoint>;

                    /**
                     * 获取挖方区域的面积
                     */
                    getCutArea(): number;

                    /**
                     * 获取填挖方对象的挖方量
                     */
                    getCutVolume(): number;

                    /**
                     * 获取填方区域的面积
                     */
                    getFillArea(): number;

                    /**
                     * 获取填挖方对象的填方量
                     */
                    getFillVolume(): number;

                    /**
                     * 获取参与填挖方分析的图层ID列表
                     */
                    getLayerIds(): Array<string>;

                    /**
                     * 获取基准面标高
                     */
                    getLevel(): number;

                    /**
                     * 获取填挖方区域的总面积
                     */
                    getTotalArea(): number;

                    /**
                     * 设置填挖方对象的边界
                     * @param boundary 填挖方分析的区域边界，由多个点组成
                     */
                    setBoundary(boundary: Array<TPoint>): void;

                    /**
                     * 设置参与填挖方分析的图层
                     * @param layerIds 参与填挖方分析的图层ID数组，支持TrerrainLayer和TilesetLayer。所有参与图层的填挖方量将进行叠加计算。
                     */
                    setLayerIds(layerIds: Array<string>): void;

                    /**
                     * 设置填挖方象的基准面标高
                     * @param level 填挖方对象的基准面标高
                     */
                    setLevel(level: number): void;
                }

                /**
                 * 填挖方对象的配置项
                 */
                class CutFillAnalysisConfig {

                    /**
                     * 填挖方分析的区域边界，由多个点组成
                     */
                    boundary: Array<TPoint>

                    /**
                     * 填挖方分析的基准面标高
                     */
                    level: number

                    /**
                     * 参与填挖方计算的图层ID数组，支持TrerrainLayer和TilesetLayer，默认使用地形图层进行填挖方分析
                     */
                    layerIds: Array<string>

                    /***
                     * Viewer对象，必填项
                     */
                    viewer: TViewer

                }
            }
            namespace HeightLimit {

                type TMode = "global" | "customized";

                /**
                 * 控高分析
                 */
                class HeightLimitAnalysis extends AnalysisBase {
                    /**
                     * 
                     * @param heightLimitAnalysisConfig 控高分析配置项
                     */
                    constructor(heightLimitAnalysisConfig: HeightLimitAnalysisConfig);

                    /**
                     * 清除控高分析区域，清除后对所有区域生效
                     */
                    clearArea(): void;

                    /**
                     * 清除控高分析对象的图层列表，清除后对所有图层生效
                     */
                    clearLayers(): void;

                    /**
                     * 获取控高分析对象的平面区域
                     */
                    getArea(): TArea;

                    /**
                     * 获取控高分析颜色
                     */
                    getColor(): Glodon.Web.Graphics.Color;

                    /**
                     * 获取控制高度
                     */
                    getHeight(): number;

                    /**
                     * 获取控高分析对象的图层列表
                     */
                    getLayerIds(): Array<string>;

                    /**
                     * 获取控高分析模式
                     */
                    getMode(): TMode;

                    /**
                     * 设置控高分析区域
                     * @param area 控高分析区域，仅当模式为"customized"时有效，不填则对所有区域生效
                     */
                    setArea(area: TArea): void;

                    /**
                     * 设置控高分析颜色
                     * @param color 控高分析颜色
                     */
                    setColor(color: Glodon.Web.Graphics.Color): void;

                    /**
                     * 设置控制高度
                     * @param height 控制高度
                     */
                    setHeight(height: number): void;

                    /**
                     * 设置控高分析对象的图层列表
                     */
                    setLayerIds(ids: Array<string>): void;

                    /**
                     * 设置控高分析模式
                     * @param mode 控高分析模式，"global"为全局，"customized"为自定义
                     */
                    setMode(mode: TMode): void;
                }

                /**
                 * 控高分析配置项
                 */
                class HeightLimitAnalysisConfig {
                    /**
                     * 
                     * @param color 控高分析颜色
                     * @param height 控制高度，根据viewer判断单位, 若为viewer3D，则单位与场景设置单位一致, 若为viewerGIS, 则单位为m单位为米，默认值为24米
                     * @param mode 控高分析模式，"global"为全局，"customized"为自定义，默认为"global"
                     * @param layerIds 	控高分析对象的图层列表，仅当模式为"customized"时有效，不填则对所有图层生效
                     * @param area 控高分析区域，仅当模式为"customized"时有效，不填则对所有区域生效
                     * @param viewer 
                     */
                    constructor(
                        color: Glodon.Web.Graphics.Color,
                        height?: number,
                        mode?: TMode,
                        layerIds?: Array<string>,
                        area?: TArea,
                        viewer?: TViewer);
                }
            }
            namespace Sightline {
                /**
                 * 通视分析
                 */
                class SightlineAnalysis extends AnalysisBase {
                    /**
                     * 
                     * @param sightlineAnalysisConfig 通视分析配置项
                     */
                    constructor(sightlineAnalysisConfig: SightlineAnalysisConfig);

                    /**
                     * 获取障碍部分的视线颜色
                     */
                    getInvisibleColor(): Glodon.Web.Graphics.Color;

                    /**
                     * 获取障碍点
                     */
                    getObstaclePoints(): Array<TPoint>;

                    /**
                     * 获取目标点
                     */
                    getTargetPoints(): Array<TPoint>;

                    /**
                     * 获取观测点
                     */
                    getViewPoint(): TPoint;

                    /**
                     * 获取可见部分的视线颜色
                     */
                    getVisibleColor(): Glodon.Web.Graphics.Color;


                    /**
                     * 设置障碍部分的视线颜色
                     * @param color 障碍部分的视线颜色
                     */
                    setInvisibleColor(color: Glodon.Web.Graphics.Color): void;

                    /**
                     * 设置目标点
                     * @param targetPoints 目标点对象的数组
                     */
                    setTargetPoints(targetPoints: Array<TPoint>): void;

                    /**
                     * 设置观察点
                     * @param viewPoint 观测点对象
                     */
                    setViewPoint(viewPoint: TPoint): void;

                    /**
                     * 设置可见部分的视线颜色
                     * @param color 可见部分的视线颜色
                     */
                    setVisibleColor(color: Glodon.Web.Graphics.Color): void;
                }

                /**
                 * 通视分析配置项
                 */
                class SightlineAnalysisConfig {
                    /**
                     *  障碍部分的视线颜色
                     */
                    invisibleColor: Glodon.Web.Graphics.Color

                    /**
                     * 目标点对象的数组
                     */
                    targetPoints: Array<TPoint>

                    /**
                     * Viewer对象
                     */
                    viewer: TViewer

                    /**
                     * 观测点对象
                     */
                    viewPoint: TPoint

                    /**
                     * 可见部分的视线颜色
                     */
                    visibleColor: Array<any>

                }
            }
            namespace Skyline {
                type TStyle = {
                    color: Glodon.Web.Graphics.Color,
                    width: number
                };

                /**
                 * 天际线
                 */
                class SkylineAnalysis extends AnalysisBase {
                    /**
                     * 天际线对象配置项
                     * @param skylineAnalysisConfig 
                     */
                    constructor(skylineAnalysisConfig: SkylineAnalysisConfig);

                    /**
                     * 获取三维的天际线分析结果
                     */
                    getSkyline3D(): Array<any>;

                    /**
                     * 天际线对象的状态
                     */
                    getStatus(): Object;

                    /**
                     * 获取天际线对象的线条样式
                     */
                    getStyle(): TStyle;

                    /**
                     * 设置天际线对象的状态
                     * @param status 天际线对象状态
                     */
                    setStatus(status: Object): void;

                    /**
                     * 设置天际线对象的线条样式
                     * @param style 天际线对象的线条样式
                     */
                    setStyle(style: TStyle): void;
                }

                /**
                 * SkylineAnalysisConfig
                 */
                class SkylineAnalysisConfig {
                    /**
                     * 
                     * @param style 天际线样式
                     * @param viewer Viewer对象，必填项
                     */
                    constructor(style: TStyle, viewer: TViewer);
                }
            }
            namespace Viewshed {
                /**
                 * 可视域分析管理器，用于管理多个可视域分析对象
                 */
                class ViewshedManager {
                    /**
                     * 
                     * @param viewshedManagerConfig 可视域分析管理器配置项
                     */
                    constructor(viewshedManagerConfig: ViewshedManagerConfig);

                    /**
                     * 添加单个可视域对象
                     * @param viewshed 可视域对象
                     */
                    addViewshed(viewshed: Viewshed3D): void;

                    /**
                     * 添加多个可视域对象
                     * @param viewsheds 由多个可视域对象组成的数组
                     */
                    addViewsheds(viewsheds: Array<Viewshed3D>): void;

                    /**
                     * 清空管理器内所有可视域对象
                     */
                    clear(): void;

                    /**
                     * 根据ID获取可视域对象
                     * @param id 可视域对象ID
                     */
                    getViewshedById(id: string): Viewshed3D;

                    /**
                     * 获取管理器内所有的可视域对象
                     */
                    getViewsheds(): Array<Viewshed3D>;

                    /**
                     * 根据ID隐藏某个可视域对象
                     * @param id 可视域对象ID
                     */
                    hideById(id: string): void;

                    /**
                     * 根据ID移除某个可视域对象
                     * @param id 可视域对象ID
                     */
                    removeById(id: string): void;

                    /**
                     * 根据ID显示某个可视域对象
                     * @param id 可视域对象ID
                     */
                    showById(id: string): void;

                    /**
                     * 重新绘制可视域对象
                     */
                    update(): void;
                }

                /**
                 * 可视域分析管理器的配置项
                 */
                class ViewshedManagerConfig {
                    viewer: TViewer;
                }

                /**
                 * 可视域对象，用于创建单个可视域对象
                 */
                class Viewshed3D {
                    /**
                     * 
                     * @param viewshed3DConfig 可视域对象配置项
                     */
                    constructor(viewshed3DConfig: Viewshed3DConfig);

                    /**
                     * 获取可视域对象的相机方向
                     */
                    getDirection(): TPosition;

                    /**
                     * 获取可视域对象的可视距离
                     */
                    getDistance(): number;

                    /**
                     * 获取不可见区域的颜色
                     */
                    getHiddenAreaColor(): Glodon.Web.Graphics.Color;

                    /**
                     * 获取可视域对象的水平视角范围
                     * @returns 可视域分析的水平视角范围，单位：弧度
                     */
                    getHorizontalFov(): number;

                    /**
                     * 获取可视域对象ID
                     */
                    getId(): string;

                    /**
                     * 获取可视域对象的观察点位置
                     */
                    getPositon(): TPosition;

                    /**
                     * 获取可视域对象的垂直视角范围
                     * @returns 可视域分析的垂直视角范围，单位：弧度
                     */
                    getVerticalFov(): number;

                    /**
                     * 获取可见区域的颜色
                     */
                    getVisibleAreaColor(): Glodon.Web.Graphics.Color;

                    /**
                     * 隐藏可视域对象
                     */
                    hide(): void;

                    /**
                     * 是否显示了视锥框线
                     */
                    isFrustumVisible(): boolean;

                    /**
                     * 设置可视域对象的相机方向
                     * @param direction 
                     */
                    setDirection(direction: TPosition): void;

                    /**
                     * 设置可视域对象的可视距离
                     * @param distance 可视距离，单位与场景设置单位一致
                     */
                    setDistance(distance: number): void;

                    /**
                     * 设置是否显示视锥框线
                     * @param visible 
                     */
                    setFrustumVisible(visible: boolean): void;

                    /**
                     * 设置不可见区域的颜色
                     * @param hiddenAreaColor 
                     */
                    setHiddenAreaColor(hiddenAreaColor: Glodon.Web.Graphics.Color): void;

                    /**
                     * 设置可视域对象的水平视角范围
                     * @param horizontalFov 可视域分析的水平视角范围，单位：弧度。如：Math.PI / 2
                     */
                    setHorizontalFov(horizontalFov: number): void;

                    /**
                     * 设置可视域对象的观察点位置
                     * @param position 观察点在世界坐标系中的位置，如：{x: 6000, y: -3600, z: 450}
                     */
                    setPosition(position: TPosition): void;

                    /**
                     * 设置可视域对象的垂直视角范围
                     * @param verticalFov 可视域分析的垂直视角范围，单位：弧度。如：Math.PI / 3
                     */
                    setVerticalFov(verticalFov: number): void;

                    /**
                     * 设置可见区域的颜色
                     * @param visibleAreaColor 可见区域的颜色，默认为Glodon.Web.Graphics.Color(0, 255, 0, 0.8)
                     */
                    setVisibleAreaColor(visibleAreaColor: Glodon.Web.Graphics.Color): void;

                    /**
                     * 显示可视域对象
                     */
                    show(): void;
                }

                class Viewshed3DConfig {
                    /**
                     * 相机的方向（观察方向），如{ x: 0.48, y: -0.64, z: -0.6 }
                     */
                    direction: TPosition

                    /**
                     * 可视距离，单位与场景设置单位一致
                     */
                    distance: number


                    /**
                     * 是否显示视锥框线，默认为true
                     */
                    frustumVisible: boolean

                    /**
                     * 不可见区域的颜色，默认为Glodon.Web.Graphics.Color(255, 0, 0, 0.8)
                     */
                    hiddenAreaColor: Glodon.Web.Graphics.Color


                    /**
                     * 可视域分析的水平视角范围，单位：弧度。如：Math.PI / 2
                     */
                    horizontalFov: number

                    /**
                     * 观察点在世界坐标系中的位置，如：{ x: 6000, y: -3600, z: 450 }
                     */
                    position: TPosition

                    /**
                     * 视域是否穿透透明构件，默认为false
                     */
                    translucenceAvailable: boolean

                    /**
                     * 可视域分析的垂直视角范围，单位：弧度。如：Math.PI / 3
                     */
                    verticalFov: number

                    /**
                     * 可见区域的颜色， 默认为Glodon.Web.Graphics.Color(0, 255, 0, 0.8)
                     */

                    visibleAreaColor: Glodon.Web.Graphics.Color
                }
            }
        }

        namespace Application {

            /**
             * 构造三维模型应用
             */
            class WebApplication3D {
                /**
                 * 
                 * @param webApplication3DConfig 配置选项
                 */
                constructor(webApplication3DConfig: WebApplication3DConfig);

                /**
                 * 注册监听事件
                 * @param event
                 * @param callback 
                 */
                addEventListener(event: WebApplication3DEvent, callback: (e: any) => void): void;

                /**
                 * 注销监听事件
                 * @param event 
                 * @param callback 
                 */
                removeEventListener(event: WebApplication3DEvent, callback: Function): void;

                /**
                 * 添加三维模型
                 * @param viewToken 模型浏览凭证
                 * @param type 模型类型
                 * @param loadConfig 加载参数
                 */
                addView(viewToken: string, type: string, loadConfig: Object): void;

                /**
                 * 销毁实例
                 */
                destroy(): void;

                /**
                 * 获取面板
                 * @param id 面板ID
                 */
                getPanel(id: string): Object;

                /**
                 * 获取工具条
                 * @param name 工具条名称
                 */
                getToolbar(name: string): Object;

                /**
                 * 获取工具条
                 */
                getToolbars(): Array<Object>;

                /**
                 * 获取 Viewer3D 对象
                 */
                getViewer(): Glodon.Bimface.Viewer.Viewer3D;

                /**
                 * 获取面板上的路径漫游列表
                 */
                getWalkthroughData(): Object;

                /**
                 * 初始化路径漫游列表，将指定文件的内容展示在路径漫游面板上
                 * @param walkthroughList 漫游列表数据
                 */
                initializeWalkthroughData(walkthroughList: Object): void;

                /**
                 * 渲染三维模型
                 */
                render(): void;
            }

            /**
             * 三维模型应用的配置项
             */
            class WebApplication3DConfig {
                /**
                 * 配置桌面端主工具条按钮的参数对象，
                 * 
                 * "Home"为主视角，
                 * 
                 * "RectangleSelect"为框选放大，
                 * 
                 * "Measure"为测量，
                 * 
                 * "Section"为剖切，
                 * 
                 * "Walk"为漫游，
                 * 
                 * "Map"为地图，
                 * 
                 * "Property"为构件详情，
                 * 
                 * "Setting"为设置，
                 * 
                 * "Information"为基本信息，
                 * 
                 * "FullScreen"为全屏，其中小地图和构件详情会根据模型是否有相关数据判断，其他默认全部加载。
                 * 
                 * 支持在按钮之间插入分割线，可对工具条进行分区，分割线参数为"DividerLine"
                 */
                Buttons: Array<"Home" | "RectangleSelect" | "Measure" | "Section" | "Walk" | "Map" | "Property" | "Setting" | "Information" | "Information" | "FullScreen" | "DividerLine">

                /**
                 * 加载模型的附带图纸对象配置项 默认值为: { displayMode: 0 } 
                 * 
                 * 其中displayMode为模型附带图纸的显示模式，0：普通模式 1：白底模式 2：黑白模式，默认普通模式
                 */
                drawingSheetConfig: Object;

                /**
                 * 设置面板显示效果预设值："performance" - 效果模式，"fluency" - 流畅模式。缺省值"performance"。
                 */
                effectMode: "performance" | "fluency";

                /**
                 * 配置移动端主工具条按钮的参数对象，
                 * 
                 * "Home"为主视角，
                 * 
                 * "View"为视角，
                 * 
                 * "RectangleSelect"为框选放大，
                 * 
                 * "Measure"为测量，
                 * 
                 * "Section"为剖切，
                 * 
                 * "Walk"为漫游，
                 * 
                 * "Property"为构件详情，
                 * 
                 * "Information"为基本信息，其中构件详情会根据模型是否有相关数据判断，其他默认全部加载。
                 */
                MobileButtons: Array<"Home" | "View" | "RectangleSelect" | "Measure" | "Section" | "Walk" | "Property" | "Information">

                /**
                 * 配置移动端工具条的参数对象，
                 * "MainToolbar"为主工具条，
                 * "ModelTree"为目录树，其中主工具条默认加载，目录树会根据模型是否有相关数据判断。
                 */
                MobileToolbars: Array<"MainToolbar" | "ModelTree">;

                /**
                 * 强制浏览UI为移动端/网页端
                 */
                navigatorType: "Web" | "Mobile";

                /**
                 * 配置桌面端工具条的参数对象，
                 * "MainToolbar"为主工具条，
                 * "ModelTree"为目录树，其中主工具条默认加载，目录树会根据模型是否有相关数据判断。
                 */
                Toolbars: Array<"MainToolbar" | "ModelTree">;
            }

            /**
             * WebApplication3D的事件
             */
            enum WebApplication3DEvent {
                /**
                 * 工具栏按钮点击事件
                 */
                ButtonOnToolbarClicked,

                /**
                 * 构件树节点点击监听事件
                 */
                ModelTreeNodeClicked,

                /**
                 * 工具栏主视图点击事件
                 */
                ToolbarHomeClick,

                /**
                 * 进入路径编辑面板的监听
                 */
                WalkthroughEdit,

                /**
                 * 路径漫游面板状态变化事件
                 */
                WalkthroughStateChanged
            }

            /**
             * 二维矢量图纸应用
             */
            class WebApplicationDrawing {
                /**
                 *
                 */
                constructor(webApplicationDrawingConfig: WebApplicationDrawingConfig);

                /**
                 * 销毁实例
                 */
                destroy(): void;

                /**
                 * 获取图纸处理后的显示信息
                 * @param viewToken 图纸浏览凭证
                 * @param callback 获取显示信息回调函数
                 */
                getRenderInfo(viewToken: string, callback: (e: any) => void): void

                /**
                 * 获取工具栏对象
                 */
                getToolbars(): Object;

                /**
                 * 获取图纸视图对象
                 */
                getViewer(): Glodon.Bimface.Viewer.ViewerDrawing;

                /**
                 * 加载图纸
                 * @param viewToken 图纸浏览凭证
                 * @param drawingId 图纸ID
                 */
                load(viewToken: string, drawingId: string): void;

                /**
                 * 注册监听事件
                 * @param event 监听事件
                 * @param callback 监听事件的回调函数
                 */
                addEventListener(event: WebApplicationDrawingEvent, callback: (e: any) => void): void;

                /**
                 * 注销监听事件
                 * @param event 
                 * @param callback 
                 */
                removeEventListener(event: WebApplicationDrawingEvent, callback: Function): void;
            }

            /**
             * 二维矢量图纸应用配置项
             */
            class WebApplicationDrawingConfig {

                /**
                 * 配置桌面端主工具条按钮的参数对象，
                 * 
                 * "Home"为主视角，
                 * 
                 * "RectZoom"为框选放大， 
                 * 
                 * "DrawingMeasure"为测量，
                 * 
                 * "Map"为地图，
                 * 
                 * "Sheets"为图纸，
                 * 
                 * "Layers"为图层，
                 * 
                 * "Setting"为设置，
                 * 
                 * "FullScreen"为全屏，其中图纸按钮会根据是否有拆图数据判断，其他默认全部加载。
                 * 
                 * 支持在按钮之间插入分割线，可对工具条进行分区，分割线参数为"DividerLine"
                 */
                Buttons: Array<"Home" | "RectZoom" | "DrawingMeasure" | "Map" | "Sheets" | "Layers" | "Setting" | "FullScreen" | "DividerLine">

                /**
                 * 配置移动端主工具条按钮的参数对象，
                 * 
                 * "Home"为主视角，
                 * 
                 * "RectZoom"为框选放大，
                 * 
                 * "DrawingMeasure"为测量，
                 * 
                 * "Layers"为图层，
                 * 
                 * "Setting"为设置， 默认全部加载。
                 */
                MobileButtons: Array<"Home" | "RectZoom" | "DrawingMeasure" | "Layers" | "Setting">

                /**
                 * 配置桌面端工具条的参数对象，
                 * 
                 * "MainToolbar"为主工具条，
                 * 
                 * "LeftSubToolbar"为视图工具条，
                 * 
                 * "SearchToolbar"为搜索工具条，默认全部显示。
                 */
                Toolbars: Array<"MainToolbar" | "LeftSubToolbar" | "SearchToolbar">

                /**
                 * 配置移动端工具条的参数对象，
                 * 
                 * "MainToolbar"为主工具条，
                 * 
                 * "LeftSubToolbar"为视图工具条，
                 * 
                 * "SearchToolbar"为搜索工具条，默认全部加载。
                 */
                MobileToolbars: Array<"MainToolbar" | "LeftSubToolbar" | "SearchToolbar">
            }

            /**
             * WebApplicationDrawing的事件
             */
            enum WebApplicationDrawingEvent {
                /**
                 * ViewerDrawing 测量事件
                 */
                DrawingMeasure,

                /**
                 * ViewerDrawing 缩放比例变化事件
                 */
                ZoomFactorChanged
            }

            /**
             * GIS场景应用
             */
            class WebApplicationGIS {
                /**
                 * 
                 * @param webApplicationGISConfig 配置选项
                 */
                constructor(webApplicationGISConfig: WebApplicationGISConfig);

                /**
                 * 添加监听事件
                 * @param event 
                 * @param callback 
                 */
                addEventListener(event: WebApplicationGISEvent, callback: (e: any) => void): void;

                /**
                 * 移除监听事件
                 * @param event 
                 * @param callback 
                 */
                removeEventListener(event: WebApplicationGISEvent, callback: Function): void;

                /**
                 * 加载场景
                 * @param viewToken 场景浏览凭证
                 */
                addScene(viewToken: string): void;

                /**
                 * 销毁实例
                 */
                destroy(): void;

                /**
                 * 获取UI管理器
                 */
                getUIManager(): Glodon.Bimface.Tiles.UI.UIManager;

                /**
                 * 获取ViewerGIS对象
                 */
                getViewer(): Glodon.Bimface.Viewer.ViewerGIS;

                /**
                 * 获取交互界面组件
                 * @param id 
                 */
                getWidget(id: string): Glodon.Bimface.Application.Widget.WalkthroughPanel;

                /**
                 * 初始化交互界面组件
                 * @param id 待构造的组件ID，包括“WalkthroughPanel”
                 */
                initializeWidget(id: string): void;
            }

            class WebApplicationGISConfig {
                /**
                 * 存放Viewer的DOM容器
                 */
                domElement: any
            }

            /**
             * WebApplicationGIS的事件
             */
            enum WebApplicationGISEvent {
                /**
                 * 图层树节点的点击事件
                 */
                LayerTreeNodeClicked,

                /**
                 * 工具栏按钮点击事件
                 */
                ButtonOnToolbarClicked
            }

            /**
             * 族模型应用
             */
            class WebApplicationRfa {
                /**
                 * 
                 * @param webApplicationRfaConfig 配置选项
                 */
                constructor(webApplicationRfaConfig: WebApplicationRfaConfig);

                /**
                 * 销毁实例
                 */
                destroy(): void;

                /**
                 * 添加三维模型
                 * @param viewToken 模型浏览凭证
                 */
                addView(viewToken: string): void;

                /**
                 * 获取工具条
                 * @param name 工具条名称
                 */
                getToolbar(name: string): Object;

                /**
                 * 获取工具条
                 * 
                 * @returns 工具条对象数组
                 */
                getToolbars(): Array<Object>;

                /**
                 * 获取 Viewer3D 对象
                 */
                getViewer(): Glodon.Bimface.Viewer.Viewer3D;

                /**
                 * 渲染三维模型
                 * @param viewToken 模型浏览凭证
                 */
                render(viewToken: string): void;
            }

            /**
             * 族模型应用配置项
             */
            class WebApplicationRfaConfig {
                /**
                 * 设置工具条Button对象
                 * 
                 * Home：主视角，
                 * 
                 * Measure：测量，
                 * 
                 * Section：剖切 
                 * 
                 * Explode：爆炸， 
                 * 
                 * Setting：设置，
                 * 
                 * RectZoom：框选，默认全部加载
                 */
                Buttons: Array<"Home" | "Measure" | "Section" | "Explode" | "Setting" | "RectZoom">;

                /**
                 * 是否加载族类型列表，默认值为true
                 */
                EnableFamilyList: boolean;

                /**
                 * 设置工具条或者目录树["MainToolbar", "ModelTree"]，不设置默认都显示
                 */
                Toolbars: Array<string>;
            }

            namespace Widget {
                class WalkthroughPanel {
                    /**
                     * 面板内路径漫游列表数据
                     */
                    getWalkthroughList(): object;

                    /**
                     * 设置路径漫游面板中的路径列表
                     * @param walkthroughList 路径漫游列表
                     */
                    setWalkthroughList(walkthroughList: Object): void;

                    /**
                     * 隐藏面板
                     */
                    hide(): void;

                    /**
                     * 显示面板
                     */
                    show(): void;
                }
            }
        }

        namespace Authentication {
        }

        namespace Camera {
            /**
             * 3D场景相机
             */
            class Camera3D {
                /**
                 * 清除相机动画，清除后可更改相机状态
                 */
                clearCameraAnimation(): void;

                /**
                 * 设置禁用/启用平移
                 * @param enabled 
                 */
                enablePan(enabled: boolean): void;

                /**
                 * 设置禁用/启用旋转
                 * @param enabled 
                 */
                enablePitch(enabled: boolean): void;

                /**
                 * 设置禁用/启用缩放
                 * @param enabled 
                 */
                enableZoom(enabled: boolean): void;

                /**
                 * 获取相机动画
                 */
                getCameraAnimation(): Object;

                /**
                 * 获取相机最大活动范围
                 */
                getCurrentRange(): number;

                /**
                 * 获取场景浏览时camera距离构件可达到的最小距离，单位为mm
                 */
                getObjectOffset(): number;

                /**
                 * 获取当前相机位置信息，用于保存后恢复相机视点
                 */
                getStatus(): Object;

                /**
                 * 获取场景浏览时缩放的速度
                 */
                getZoomSpeed(): number;

                /**
                 * 锁定相机绕轴旋转范围
                 * @param axis 暂支持Z轴
                 * @param range 相机沿轴转动时可变化的范围，如[Math.PI / 6, Math.PI / 3]，不填则为禁止绕该轴旋转
                 */
                lockAxis(axis: Glodon.Bimface.Viewer.AxisOption, range: Array<number>): void;

                /**
                 * 设置相机动画，可与路径动画绑定。绑定后不可更改相机状态。
                 * @param option 
                 */
                setCameraAnimation(option: {
                    /**
                     * 相机动画参数
                     */
                    pathAnimation: Glodon.Bimface.Plugins.Animation.PathAnimation,

                    /**
                     * 相机位置与路径动画的空间距离，默认为5000mm， 单位为mm
                     */
                    distance: number,

                    /**
                     * 相机角度，单位为弧度，范围在[-π,π]，默认为0，即相机跟随在路径动画后方平视。当相机处于路径动画上方时，角度为负；相机处于路径动画下方时，角度为正。
                     */
                    angle: number
                }): void;

                /**
                 * 设置相机类型
                 * @param cameraType 相机类型，"OrthographicCamera" 正交相机，"PerspectiveCamera" 透视相机
                 * @param fov 相机视锥体垂直视角（即从下到上的观察角度），仅在透视相机中使用，取值范围为[10, 180]
                 */
                setCameraType(cameraType: "OrthographicCamera" | "PerspectiveCamera", fov: number): void;

                /**
                 * 限制相机最大活动范围
                 * @param far 相机与模型最远距离参数，范围(0, ∞)，默认值为2
                 */
                setMaximalRange(far: number): void;

                /**
                 * 场景浏览时camera距离构件可达到的最小距离，超过即穿过构件
                 * @param offset 相机距离构件可达到的最小距离，默认500mm
                 */
                setObjectOffset(offset: number): void;

                /**
                 * 根据相机位置信息恢复视点
                 * @param camera 相机状态，getCameraStatus()返回的对象
                 * @param callback 相机还原之后回调函数，可不写
                 */
                setStatus(camera: Object, callback?: Function): void;

                /**
                 * 场景浏览时缩放的速度定义，范围为[0,1]
                 * @param zoomSpeed 
                 */
                setZoomSpeed(zoomSpeed: number): void;

                /**
                 * 取消相机绕轴旋转限制
                 * @param axis 暂支持Z轴
                 */
                unlockAxis(axis: Glodon.Bimface.Viewer.AxisOption): void;

                /**
                 * 缩放至指定包围盒
                 * @param option 
                 * @param callback 缩放完成时的回调函数，可不填写
                 */
                zoomToBoundingBox(option: {
                    /**
                     * 包围盒信息
                     */
                    boundingBox: Object,

                    /**
                     * 包围盒缩放比例，默认值为0.5，margin > 0 模型缩小（包围盒变大），margin < 0 模型放大（包围盒变小）,margin最小取值不低于-1
                     */
                    margin?: number,

                    /**
                     * 动画持续时间，单位为毫秒， 默认值为1000
                     */
                    duration?: number,

                    /**
                     * 	观察方向，相机看向包围盒中心点的方向，可不填。例{x:0,y:0,z:-1}表示俯视方向
                     */
                    direction?: TPosition
                }, callback?: Function): void;
            }

            /**
             * GIS场景相机
             */
            class CameraGIS {
                /**
                 * 清除相机动画，清除后可更改相机状态
                 */
                clearCameraAnimation(): void;

                /**
                 * 转换相机状态的模式
                 * @param status 描述相机状态的对象
                 * @param mode 目标模式，"World"为世界坐标模式，“LatLon”为经纬度模式
                 */
                convertStatus(status: Object, mode: "World" | "LatLon"): Object;

                /**
                 * 设置禁用/启用平移
                 * @param enabled 
                 */
                enablePan(enabled: boolean): void;

                /**
                 * 设置禁用/启用俯仰
                 * @param enabled 
                 */
                enablePitch(enabled: boolean): void;

                /**
                 * 设置禁用/启用旋转
                 * @param enabled 
                 */
                enableRotate(enabled: boolean): void;

                /**
                 * 设置禁用/启用缩放
                 * @param enabled 
                 */
                enableZoom(enabled: boolean): void;

                /**
                 * 获取相机动画
                 */
                getCameraAnimation(): Object;

                /**
                 * 获取当前主视角的相机状态
                 */
                getHomeView(): Object;

                /**
                 * 获取相机限制的最小高度
                 */
                getMinimumElevation(): number;

                /**
                 * 描述相机状态的对象
                 */
                getStatus(): Object;

                /**
                 * 切换至主视角
                 */
                home(): void;

                /**
                 * 恢复默认的主视角设置
                 */
                restoreHomeView(): void;

                /**
                 * 设置相机动画，可与路径动画绑定。绑定后不可更改相机状态。
                 * @param option 
                 */
                setCameraAnimation(option: {
                    /**
                     * 相机待绑定的路径动画对象,必填
                     */
                    pathAnimation: Glodon.Bimface.Plugins.Animation.PathAnimation,

                    /**
                     * 相机位置与路径动画的空间距离，默认为5m,单位为m
                     */
                    distance?: number,

                    /**
                     * 相机角度，单位为弧度，范围在[-π,π]，默认为0，即相机跟随在路径动画后方平视。当相机处于路径动画上方时，角度为负；相机处于路径动画下方时，角度为正。
                     */
                    angle?: number
                }): void;

                /**
                 * 将指定的相机状态设置为主视角
                 * @param homeView 
                 */
                setHomeView(homeView: Object): void;

                /**
                 * 设置相机限制的最小高度
                 * @param elevation 相机限制的最小高度
                 */
                setMinimumElevation(elevation: number): void;

                /**
                 * 设置场景相机状态
                 * @param status 描述相机状态的对象
                 * @param callback 设置成功的回调函数，可不填写
                 */
                setStatus(status: Object, callback?: Function): void;

                /**
                 * 开始自动旋转相机
                 * @param speed 速率，正负表示方向，数值表示速度
                 * @param point 旋转中心，缺省值为场景显示的模型包围盒中心
                 */
                startAutoRotate(speed: number, point: Object): void;

                /**
                 * 停止自动旋转相机
                 */
                stopAutoRotate(): void;

                /**
                 * 相机放大
                 */
                zoomIn(): void;

                /**
                 * 相机缩小
                 */
                zoomOut(): void;

                /**
                 * 
                 * @param option 缩放设置
                 * @param callback 缩放完成时的回调函数，可不填写
                 */
                zoomToBoundingBox(option: {
                    /**
                     * 包围盒信息
                     */
                    boundingBox: Object,

                    /**
                     * 包围盒缩放比例，默认值为0.5，margin > 0 模型缩小（包围盒变大），margin < 0 模型放大（包围盒变小）,margin最小取值不低于-1
                     */
                    margin?: number,

                    /**
                     * 动画持续时间，单位为毫秒， 默认值为1000
                     */
                    duration?: number,

                    /**
                     * 观察方向，相机看向包围盒中心点的方向，可不填。例{x:0,y:0,z:-1}表示俯视方向
                     */
                    direction?: TPosition
                }, callback?: Function): void;
            }
        }

        namespace Common {
            enum Credit {
                Amap,
                ArcGIS,
                BingMap,
                Custom,
                Google,
                None,
                OSM,
                Tianditu
            }

            enum ImageStyle {
                CustomColor,
                DarkBlue,
                DarkGreen
            }

            namespace Type {
                enum EffectType {
                    /**
                     * 曲线动画效果
                     */
                    CurveAnimation,

                    /**
                     * 扇形扫描效果
                     */
                    FanScan,

                    /**
                     * 火焰效果
                     */
                    FireEffect,

                    /**
                     * 锚点效果
                     */
                    PrismPoint,

                    /**
                     * 雨景效果
                     */
                    Rain,

                    /**
                     * 环状扫描效果
                     */
                    RingScan,

                    /**
                     * 天空盒效果
                     */
                    SkyBoxManager,

                    /**
                     * 电子围墙效果
                     */
                    WallEffect,

                    /**
                     * 水面效果
                     */
                    WaterEffect
                }
            }

            namespace Units {
                enum LengthUnits {
                    /**
                     * 厘米
                     */
                    Centimeter,

                    /**
                     * 千米
                     */
                    Kilometer,

                    /**
                     * 米
                     */
                    Meter,

                    /**
                     * 毫米
                     */
                    Millimeter,

                    /**
                     * 无
                     */
                    None,
                }
            }
        }

        namespace Data {

        }

        /**
         * 模型文件属性管理器
         */
        class DataManager {
            /**
             * 获取坐标系信息
             * @param callback 
             */
            getCoordinateSystem(callback: Function): void;

            /**
             * 获取模型楼层列表数据
             * @param callback 
             */
            getFloors(callback: Function): void;

            /**
             * 获取文件数据
             * @param callback 
             */
            getManifest(callback: Function): void;

            /**
             * 获取构件树信息
             * @param callback 
             */
            getModelTree(callback: Function): void;
        }

        namespace ElementManager {

            /**
             * 构件管理器
             */
            class ComponentManager {
                /**
                 * 设置构件闪烁
                 * @param condition 条件参数
                 * @param color 构件闪烁颜色
                 * @param interval 闪烁间隔时间（毫秒），参数为空时恢复为默认，参数 time <= 0 时无效
                 * @param times 闪烁次数，参数为空时默认不限次数
                 */
                blink(condition: Omit<TComponentCondition, "all">, color: Glodon.Web.Graphics.Color, interval: number, times: number): void;

                /**
                 * 取消所有构件的闪烁状态
                 */
                clearAllBlinkComponents(): void;

                /**
                 * 根据筛选条件取消构件闪烁
                 * @param condition 
                 */
                clearBlinkComponents(condition: Omit<TComponentCondition, "all">): void;

                /**
                 * 清空发光效果
                 */
                clearGlowEffect(): void;

                /**
                 * 取消隔离
                 */
                clearIsolation(): void;

                /**
                 * 清空选中构件
                 */
                clearSelection(): void;

                /**
                 * 根据条件获取包围盒信息
                 * @param condition 
                 * 
                 * @returns 包围盒对象。若筛选条件包含多个构件，则返回的包围盒为涵盖所有构件的最小包围盒
                 */
                getBoundingBox(condition: TComponentCondition): Object;

                /**
                 * 根据集合ID获取集合中所有构件的ID
                 * @param id 集合ID
                 * @param callback 获取成功的回调函数，将返回由集合中所有构件ID组成的数组
                 */
                getComponentsBySetId(id: string, callback: Function): void;

                /**
                 * 根据构件ID获取ObjectData，用于作为筛选条件
                 * @param id 构件ID
                 */
                getObjectDataById(id: string): Object;

                /**
                 * 根据构件ID获取所属集合的信息
                 * @param id 
                 * @param callback 获取集合信息的回调函数，集合信息格式示例{id: "1234", name: "parent", type: "group", elements: ['1','2','3','4',...]}
                 */
                getSetByComponentId(id: string, callback: Function): void;

                /**
                 * 根据条件隐藏对应构件
                 * @param condition 
                 */
                hide(condition: TComponentCondition): void;

                /**
                 * 根据条件隔离构件
                 * @param condition 
                 * @param state 被隔离构件的显示状态，如Glodon.Bimface.Viewer.IsolateOption.MakeOthersTranslucent
                 */
                isolate(condition: TComponentCondition, state: Glodon.Bimface.Viewer.IsolateOption): void;

                /**
                 * 根据条件对构件着色
                 * @param condition 
                 * @param color 
                 */
                overrideColor(condition: TComponentCondition, color: Glodon.Web.Graphics.Color): void;

                /**
                 * 根据条件对构件线框着色
                 * @param condition 
                 * @param color 
                 */
                overrideFrameColor(condition: TComponentCondition, color: Glodon.Web.Graphics.Color): void;

                /**
                 * 根据条件设置构件的不透明度
                 * @param condition 
                 * @param opacity 不透明度，取值范围[0, 1]
                 */
                overrideOpacity(condition: TComponentCondition, opacity: number): void;

                /**
                 * 根据ID移除发光效果
                 * @param ids 
                 */
                removeGlowEffectById(ids: Array<string>): void;

                /**
                 * 根据条件清空构件颜色，恢复默认显示
                 * @param condition 
                 */
                restoreColor(condition: TComponentCondition): void;

                /**
                 * 根据条件清除构件线框着色，恢复默认显示
                 * @param condition 
                 */
                restoreFrameColor(condition: TComponentCondition): void;

                /**
                 * 根据条件取消构件的不透明度设置
                 * @param condition 
                 */
                restoreOpacity(condition: TComponentCondition): void;

                /**
                 * 根据条件选择对应构件
                 * @param condition 
                 */
                select(condition: TComponentCondition): any;

                /**
                 * 根据ID列表设置构件、房间、外部构件的发光效果
                 * @param ids 
                 * @param opt 
                 */
                setGlowEffectById(ids: Array<string>, opt: TGlowEffectOptions): void;

                /**
                 * 根据条件显示对应构件
                 * @param condition 
                 */
                show(condition: TComponentCondition): void;

                /**
                 * 根据平面切分构件
                 * @param id 
                 * @param plane 
                 */
                splitComponentByPlane(id: string, plane: {
                    /**
                     * 平面的原点
                     */
                    point: Object,

                    /**
                     * 平面的法向量
                     */
                    normal: Object,

                    /**
                     * 平面的范围，如{width:10,height:5}。若不填，则为无限平面
                     */
                    range: {
                        width: number,
                        height: number
                    }
                }): void;
            }

            /**
             * 场景效果管理器，可对场景内添加的效果进行管理、编辑
             */
            class EffectManager {

                addEffect(effect: Glodon.Bimface.Plugins.TEffect, option: {
                    /**
                     * 效果ID，必填
                     */
                    id: string,

                    /**
                     * 效果名称，必填
                     */
                    name: string,

                    /**
                     * 父文件夹ID，默认为根目录
                     */
                    parentId?: string
                }): void;

                addGroup(option: {
                    /**
                    * 文件夹ID
                    */
                    id: string,

                    /**
                     * 文件夹名称
                     */
                    name: string,

                    /**
                     * 父文件夹ID，默认为根目录
                     */
                    parentId?: string
                }): void;

                /**
                 * 根据ID获取对应效果对象
                 * @param id 
                 */
                getEffect(id: string): Object;

                /**
                 * 根据条件获取对应效果对象
                 * @param condition 
                 */
                getEffects(condition: Omit<TEffectCondition, 'all'>): Array<Object>;

                /**
                 * 获取场景内效果配置对象
                 */
                getEffectsObject(): Array<Object>;

                /**
                 * 根据条件隐藏对应效果
                 * @param condition 
                 */
                hide(condition: TEffectCondition): void;

                /**
                 * 根据条件显示对应效果
                 * @param condition 
                 */
                show(condition: TEffectCondition): void;

                /**
                 * 更新管理器内的全部对象
                 */
                update(): void;
            }

            /**
             * 外部构件管理器，用于管理和操作ExternalObjectLayer下的外部构件
             */
            class ExternalObjectManager {
                /**
                 * 注册监听事件
                 * @param event 外部构件的监听事件
                 * @param callback 监听事件的回调函数
                 */
                addEventListener(event: Glodon.Bimface.ElementManager.ExternalObjectEvent, callback: Function): void;

                /**
                * 移除监听事件
                * @param event 
                * @param callback 
                */
                removeEventListener(event: Glodon.Bimface.ElementManager.ExternalObjectEvent, callback: Function): void;

                /**
                 * 移除管理器内所有的外部构件
                 */
                clear(): void;

                /**
                 * 清空管理器内的发光效果
                 */
                clearGlowEffect(): void;

                /**
                 * 克隆指定的外部构件
                 * @param objectId 被克隆的外部构件ID
                 * @param name 克隆后的外部构件名称
                 */
                clone(objectId: string, name: string): string;

                /**
                 * 根据ID将指定构件转换为外部构件
                 * @param id 
                 * @param hideSourceObject 是否隐藏源对象，默认为true
                 * 
                 * @returns 转换完的构件对象
                 */
                convert(id: {
                    /**
                     * 构件所在的图层ID
                     */
                    layerId: string,

                    /**
                     * 构件ID
                     */
                    objectId: string
                }, hideSourceObject): Object;

                /**
                 * 获取所有外部构件的ID
                 */
                getAllObjectIds(): Array<string>;

                /**
                 * 根据ID获取外部构件的包围盒信息
                 * @param id 
                 */
                getBoundingBoxById(id: string): Object;

                /**
                 * 根据ID获取指定外部构件的位置
                 * @param id 
                 */
                getLocation(id: string): Object;

                /**
                 * 获取指定ID外部构件的objectData内容
                 * @param id 
                 * 
                 * @returns 筛选条件数组，每个元素均为key-value对象
                 */
                getObjectData(id: string): Array<any>;

                /**
                 * 根据构件名称获取对应的构件ID
                 * @param name 
                 */
                getObjectIdByName(name: string): string;

                /**
                 * 根据ID获取外部构件的局部坐标原点在世界坐标系中的位置
                 * @param id 
                 */
                getPosition(id: string): TPosition;

                /**
                 * 获取指定外部构件的坐标变换状态
                 * @param id 
                 */
                getTransformation(id: string): Array<any>;

                /**
                 * 根据ID判断外部构件是否包含动画
                 * @param id 
                 */
                isAnimatable(id: string): boolean;

                /**
                 * 添加外部构件
                 * @param option 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                loadObject(option: {
                    /**
                     * 外部构件名称，必填
                     */
                    name: string,

                    /**
                     * 外部构件资源对象
                     */
                    url: {
                        /**
                         * 外部构件资源url, 与option.object之间必填一项
                         */
                        objectUrl: string,

                        /**
                         * 外部构件mtl资源url
                         */
                        mtlUrl: string,
                    },

                    /**
                     * 待加载的外部构件对象
                     */
                    object: Object,

                    /**
                     * 	筛选条件数组
                     */
                    objectData: Array<any>,

                    /**
                     * 判断是否导入外部构件的光照效果
                     */
                    enableLight: boolean,
                }, successCallback: Function, failureCallback: Function): void;

                /**
                 * 根据ID对外部构件在局部坐标系下进行平移
                 * @param id 
                 * @param offset 
                 */
                offset(id: string, offset: TPosition): void;

                /**
                 * 根据ID对外部构件在局部坐标系的X方向进行平移
                 * @param id 
                 * @param offsetX 
                 */
                offsetX(id: string, offsetX: number): void;

                /**
                 * 根据ID对外部构件在局部坐标系的Y方向进行平移
                 * @param id 
                 * @param offsetY 
                 */
                offsetY(id: string, offsetY: number): void;

                /**
                 * 根据ID对外部构件在局部坐标系的Z方向进行平移
                 * @param id 
                 * @param offsetZ 
                 */
                offsetZ(id: string, offsetZ: number): void;


                /**
                 * 根据条件给指定外部构件着色
                 * @param condition 
                 * @param color 
                 */
                overrideColor(condition: TFeatureCondition, color: Glodon.Web.Graphics.Color): void;

                /**
                 * 根据ID暂停外部构件动画
                 * @param id 管理器内的外部构件ID
                 */
                pause(id: string): void;

                /**
                 * 根据ID播放外部构件动画
                 * @param id 管理器内的外部构件ID
                 */
                play(id: string): void;

                /**
                 * 根据ID将指定外部构件从场景中移除
                 * @param id 管理器内的外部构件ID
                 */
                removeById(id: string): void;

                /**
                 * 根据ID列表将指定外部构件从场景中移除
                 * @param ids 
                 */
                removeByIds(ids: Array<string>): void;

                /**
                 * 根据ID移除发光效果
                 * @param ids 管理器内的外部构件ID
                 */
                removeGlowEffectById(ids: Array<string>): void;

                /**
                 * 根据条件取消外部构件的选中状态
                 * @param condition 
                 */
                removeSelection(condition: TFeatureCondition): void;

                /**
                 * 根据条件清空外部构件颜色，恢复默认显示
                 * @param condition 
                 */
                restoreColor(condition: TFeatureCondition): void;

                /**
                 * 根据ID将外部构件绕局部坐标系的坐标轴进行旋转
                 * @param id 外部构件ID
                 * @param rotation 外部构件绕局部坐标轴的旋转值，如{x:Math.PI/4, y: 0, z: 0}
                 */
                rotate(id: string, rotation: number): void;

                /**
                 * 根据自定义基点和旋转轴旋转外部构件，坐标系为世界坐标系
                 * @param id 管理器内的外部构件ID
                 * @param basePoint 旋转中心点坐标 例如：{ x: 5000, y: 3000, z: -600 }
                 * @param axis 旋转向量 例如：{ x: 0, y: 0.5, z: -0.6 }
                 * @param radian 旋转弧度值 如Math.PI / 6
                 */
                rotateOnBasePoint(id: string, basePoint: TPosition, axis: TVector, radian: number): void;

                /**
                 * 根据ID将外部构件沿着局部坐标系X轴旋转
                 * @param id 管理器内的外部构件ID
                 * @param radianX 外部构件沿着局部坐标系X轴旋转的弧度值
                 */
                rotateX(id: string, radianX: number): void;

                /**
                 * 根据ID将外部构件沿着局部坐标系Y轴旋转
                 * @param id 管理器内的外部构件ID
                 * @param radianY 外部构件沿着局部坐标系Y轴旋转的弧度值
                 */
                rotateY(id: string, radianY: number): void;

                /**
                 * 根据ID将外部构件沿着局部坐标系Z轴旋转
                 * @param id 管理器内的外部构件ID
                 * @param radianZ 外部构件沿着局部坐标系Z轴旋转的弧度值
                 */
                rotateZ(id: string, radianZ: number): void;

                scale(id: string, scale: number): void;

                scaleOnBasePoint(id: string, basePoint: TPosition, scale: number): void;

                scaleX(id: string, scaleX: number): void;
                scaleY(id: string, scaleY: number): void;
                scaleZ(id: string, scaleZ: number): void;

                /**
                 * 根据条件选择对应外部构件
                 * @param condition 
                 */
                select(condition: TFeatureCondition): Array<Object>;

                /**
                 * 根据ID列表设置外部构件的发光效果
                 * @param ids 
                 * @param option 
                 */
                setGlowEffectById(ids: Array<string>, option: TGlowEffectOptions): void;

                /**
                 * 根据ID设置指定外部构件的位置，可设置经纬度高程，也可设置世界坐标
                 * @param id 
                 * @param location 
                 */
                setLocation(id: string, location: { latLon: TLatLon } | { worldPosition: TPosition }): void;

                /**
                 * 设置指定ID外部构件的objectData内容，用于构件筛选
                 * @param id 
                 * @param objectData 
                 */
                setObjectData(id: string, objectData: Array<Object>): void;

                /**
                 * 根据ID设置外部构件的局部坐标原点在世界坐标系中的位置
                 * @param id 管理器内的外部构件ID
                 * @param position 
                 */
                setPosition(id: string, position: TPosition): void;

                /**
                 * 设置指定外部构件的坐标变换状态
                 * @param id 管理器内的外部构件ID
                 * @param transformation 描述模型坐标变换的对象，可通过ExternalObjectManager.getTransformation()获得
                 */
                setTransformation(id: string, transformation: Array<any>): void;

                /**
                 * 根据ID停止播放外部构件动画
                 * @param id 
                 */
                stop(id: string): void;

                /**
                 * 根据ID设置世界坐标系中的点和向量，在外部构件局部坐标系中的位置和方向
                 * @param id 
                 * @param option 
                 * 
                 * @returns 世界坐标系下的点和向量，在外部构件的局部坐标系中的位置和方向，例如：{localPosition:{ x: 1000, y: 2000, z: -300 },localVector:{ x: 0, y: 0.5, z: -1 }}
                 */
                toLocalPosition(id: string, option: { worldPosition: TPosition, worldVector: TVector }): Object;

                /**
                 * 根据ID设置在外部构件局部坐标系中的点和向量，在世界坐标系中的位置和方向
                 * @param id 
                 * @param option 
                 * 
                 * @results 外部构件局部坐标系下的点和向量，世界坐标系中的位置和方向，例如：{worldPosition:{x: 5000, y: 3000, z: -600 },worldVector:{ x: 0, y: 0.5, z: -0.6 }}
                 */
                toWorldPosition(id: string, option: { localPosition: TPosition, localVector: TVector }): object;

                /**
                 * 平移外部构件，坐标系为世界坐标系
                 * @param id 
                 * @param translation 平移向量 例如：{ x: 5000, y: 3000, z: -600 }
                 */
                translate(id: string, translation: TVector): void;

                /**
                 * 按条件隐藏外部构件
                 * @param condition 
                 */
                hide(condition: TFeatureCondition): void;

                /**
                 * 按条件显示外部构件
                 * @param condition 
                 */
                show(condition: TFeatureCondition): void;
            }

            /**
             * 线要素管理器
             */
            class LineFeatureManager {
                /**
                 * 清空发光效果
                 */
                clearGlowEffect(): void;

                /**
                 * 根据要素ID获取ObjectData，用于作为筛选条件
                 * @param id 
                 */
                getObjectDataById(id: string): Object;

                /**
                 * 根据ID移除发光效果
                 * @param ids 
                 */
                removeGlowEffectById(ids: Array<string>): void;

                /**
                 * 根据ID列表设置构件、房间、外部构件的发光效果
                 * @param ids 
                 * @param opt 
                 */
                setGlowEffectById(ids: Array<string>, opt: TGlowEffectOptions): void;
            }

            /**
             * 点要素管理器
             */
            class PointFeatureManager {
                /**
                 * 根据条件获取对应点要素的ID
                 * @param condition 
                 */
                getIds(condition: Omit<TFeatureCondition, 'ids'>): Array<string>;

                /**
                 * 根据ID获取点要素的世界坐标
                 * @param id 点要素ID
                 */
                getPosition(id: string): TPosition;

                /**
                 * 根据ID获取点要素的属性信息
                 * @param id 
                 */
                getProperty(id: string): Object;

                /**
                 * 根据条件隐藏对应要素
                 * @param condition 
                 */
                hide(condition: TFeatureCondition): void;

                /**
                 * 根据条件显示对应要素
                 * @param condition 
                 */
                show(condition: TFeatureCondition): void;
            }

            /**
             * 面要素管理器
             */
            class PolygonFeatureManager {

                /**
                 * 清空发光效果
                 */
                clearGlowEffect(): void;

                /**
                 * 根据ID获取指定面要素的面积
                 * @param id 面要素ID
                 * 
                 * @returns 面要素面积大小，单位为m2
                 */
                getArea(id: string): number;


                /**
                 * 根据要素ID获取ObjectData，用于作为筛选条件
                 * @param id 
                 */
                getObjectDataById(id: string): Object;

                /**
                 * 根据ID移除发光效果
                 * @param ids 
                 */
                removeGlowEffectById(ids: Array<string>): void;

                /**
                 * 根据条件清空面要素样式
                 * @param condition 
                 */
                restoreOutlineStyle(condition: TFeatureCondition): void;

                /**
                 * 根据条件清空面要素样式
                 * @param conditions 
                 */
                restoreStyle(conditions: TFeatureCondition): void;

                /**
                 * 根据ID列表设置构件、房间、外部构件的发光效果
                 * @param ids 构件、房间、外部构件ID列表
                 * @param opt 发光效果参数
                 */
                setGlowEffectById(ids: Array<string>, opt: TGlowEffectOptions): void;

                /**
                 * 
                 * @param condition 设置面要素边框样式
                 * @param style 
                 */
                setOutlineStyle(condition: TFeatureCondition, style: {
                    color: Glodon.Web.Graphics.Color,
                    width: number
                }): void;

                /**
                 * 根据条件设置面要素样式
                 * @param condition 
                 * @param style 
                 */
                setStyle(condition: TFeatureCondition, style: {
                    color: Glodon.Web.Graphics.Color,
                    width: number
                }): void;
            }

            enum ExternalObjectEvent {

                /**
                 * 外部构件坐标变换事件
                 */
                Transformed
            }
        }

        namespace FeatureData {

        }

        namespace Layer {
            type AnyLayer = BIMLayer | DrawingLayer | ExternalObjectLayer | FeatureLayer | GroupLayer | TerrainLayer | TileLayer | TilesetLayer;

            /**
             * BIM模型图层
             */
            class BIMLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    /**
                     * 加载资源的访问令牌
                     */
                    viewToken: string,

                    /**
                     * 加载资源时的可见性，默认为true，选填
                     */
                    isVisible?: boolean,

                    /**
                     * 资源加载后的坐标变换状态，默认为单位矩阵，即不产生变化，选填
                     */
                    transformation?: Array<any>,

                    /**
                     * 是否投射阴影，默认为true，选填
                     */
                    castShadow?: boolean,

                    /**
                     * 是否接收阴影，默认为true，选填
                     */
                    receiveShadow?: boolean
                });

                /**
                 * 清空楼层爆炸效果
                 */
                clearFloorExplosion(): void;

                /**
                 * 设置该图层是否投射阴影
                 * @param isEnabled 
                 */
                enableCastShadow(isEnabled: boolean): void;

                /**
                 * 设置该图层是否接收阴影
                 * @param isEnabled 
                 */
                enableReceiveShadow(isEnabled: boolean): void;

                /**
                 * 获取包围盒信息
                 */
                getBoundingBox(): Object;

                /**
                 * 获取图层当前版本
                 */
                getCurrentVersion(): number;

                /**
                 * 获取文件属性管理器对象
                 */
                getDataManager(): Glodon.Bimface.DataManager;

                /**
                 * 获取图层的曝光补偿
                 */
                getExposureCompensation(): number;

                /**
                 * 获取楼层爆炸离散方向
                 */
                getFloorExplosionDirection(): Object;

                /**
                 * 获取楼层爆炸离散系数
                 */
                getFloorExplosionExtent(): number;

                /**
                 * 获取参与楼层爆炸的楼层ID列表
                 */
                getFloorExplosionList(): Array<string>;

                /**
                 * 获取该图层的geometry error
                 */
                getGeometryErrorRatio(): number;

                /**
                 * 获取图层ID
                 */
                getId(): string;

                /**
                 * 获取模型基点位置
                 */
                getLocation(): { latLon: { lat: number, lon: number, alt: number }, worldPosition: TPosition };

                /**
                 * 获取图层的Object Data信息
                 */
                getObjectData(): Array<Object>;

                /**
                 * 获取图层不透明度
                 */
                getOpacity(): number;

                /**
                 * 获取坐标变换状态
                 */
                getTransformation(): Array<any>;

                /**
                 * 获取图层的可视范围
                 */
                getVisualRange(): TRange;

                /**
                 * hide()
                 */
                hide(): void;

                /**
                 * 获取该图层是否投射阴影
                 */
                isCastShadowEnabled(): boolean;

                /**
                 * 获取该图层是否接收阴影
                 */
                isReceiveShadowEnabled(): boolean;

                /**
                 * 构件线框是否可见
                 */
                isWireframeVisible(): boolean;

                /**
                 * 加载userdata等业务数据 以支持选择过滤等
                 */
                loadBusinessResources(): void;

                /**
                 * 设置图层的曝光补偿，补偿量范围为[-1, 1]，默认为0，正值代表增加曝光，负值代表减少曝光
                 * @param compensation 
                 */
                setExposureCompensation(compensation: number): void;

                /**
                 * 设置楼层爆炸效果
                 * @param extent 楼层爆炸离散系数，范围为[0, 30]
                 * @param floorIds 参与楼层爆炸的楼层ID列表，默认全部楼层参与，floorIds=[]时所有楼层不参与楼层爆炸
                 * @param direction 楼层爆炸的方向，缺省值为{x: 0, y: 0, z: 1}
                 */
                setFloorExplosion(extent: number, floorIds: Array<string>, direction: TVector): void;

                /**
                 * 调整图层的geometry error，会影响到该图层的加载时机
                 * @param ratio 调整geometry error的参数
                 */
                setGeometryErrorRatio(ratio: number): void;

                /**
                 * 设置模型基点位置，可设置经纬度高程，也可设置世界坐标
                 * @param location 
                 */
                setLocation(location: { latLon: TLatLon } | { worldPosition: TPosition }): void;

                /**
                 * 设置图层不透明度
                 * @param opacity 透明度，取值范围[0, 1]
                 */
                setOpacity(opacity: number): void;

                /**
                 * 设置模型绕Z轴旋转
                 * @param basePoint 模型旋转的基点，格式如：{x: 100, y: -20, z: 10}
                 * @param rotation 模型旋转的弧度值
                 */
                setRotationZ(basePoint: TPosition, rotation: number): void;

                /**
                 * 设置模型缩放
                 * @param basePoint 模型缩放的基点，格式如：{x: 100, y: -20, z: 10}
                 * @param scale 模型缩放系数
                 */
                setScale(basePoint: TPosition, scale: number): void;

                /**
                 * 设置坐标变换状态
                 * @param transformation 描述模型坐标变换的对象
                 */
                setTransformation(transformation: Array<any>): void;

                /**
                 * 设置模型平移
                 * @param translation 
                 */
                setTranslation(translation: TPosition): void;

                /**
                 * 设置图层的可视范围
                 * @param range 图层可视范围，包括最近距离与最远距离，可仅设置单个值，单位为m。例{min：0，max：500}
                 */
                setVisualRange(range: TRange): void;

                /**
                 * 设置构件线框是否可见
                 * @param isVisible 构件线框是否可见，默认为true
                 */
                setWireframeVisible(isVisible: boolean): void;
            }

            /**
             * 三维图纸图层，用于在GIS场景内添加流式加载模式的图纸模型
             */
            class DrawingLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    viewToken: string,
                    isVisible?: boolean,
                    transformation?: Array<any>
                });

                getId(): string;

                getOpacity(): number;

                getTransformation(): Array<any>;

                hide(): void;

                show(): void;

                setOpacity(opacity: number): void;

                setRotationZ(basePoint: TPosition, rotation: number): void;

                setScale(basePoint: TPosition, scale: number): void;

                setTransformation(transformation: Array<any>): void;

                setTranslation(translation: TVector): void;
            }

            /**
             * 外部构件图层，用于ViewerGIS。
             */
            class ExternalObjectLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    isVisible?: boolean,
                    /**
                     * 图层数据加载优先级，默认为5，即最低
                     */
                    priority?: number
                });

                /**
                 * 获取外部构件图元管理器对象
                 */
                getExternalObjectManager(): Glodon.Bimface.ElementManager.ExternalObjectManager;

                getId(): string;

                hide(): void;

                show(): void;
            }

            /**
             * SHP图层
             */
            class FeatureLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    viewToken: string,
                    isVisible?: boolean,
                    /**
                     * 是否投射阴影，默认为false，选填
                     */
                    castShadow?: boolean,

                    /**
                     * 是否接收阴影，默认为true，选填
                     */
                    receiveShadow?: boolean
                });

                /**
                 * 设置该图层是否投射阴影
                 * @param isEnabled 
                 */
                enableCastShadow(isEnabled: boolean): void;

                /**
                 * 设置该图层是否接收阴影
                 * @param isEnabled 
                 */
                enableReceiveShadow(isEnabled: boolean): void;

                /**
                 * 获取包围盒信息
                 */
                getBoundingBox(): Object;

                getCurrentVersion(): number;

                getDataManager(): Glodon.Bimface.DataManager;

                /**
                 * 获取图层的曝光补偿
                 */
                getExposureCompensation(): number;

                /**
                 * 获取该图层的geometry error
                 */
                getGeometryErrorRatio(): number;

                getId(): string;

                /**
                 * 获取模型基点位置
                 */
                getLocation(): { latLon: TLatLon, worldPosition: TPosition };

                /**
                 * 获取图层的Object Data信息
                 */
                getObjectData(): Array<Object>;

                getOpacity(): number;

                getTransformation(): Array<any>;

                getVisualRange(): TRange;

                hide(): void;
                show(): void;

                /**
                 * 获取该图层是否投射阴影
                 */
                isCastShadowEnabled(): boolean;

                /**
                 * 获取该图层是否接收阴影
                 */
                isReceiveShadowEnabled(): boolean;

                /**
                 * 加载userdata等业务数据 以支持选择过滤等
                 */
                loadBusinessResources(): void;

                /**
                 * 设置图层的曝光补偿，补偿量范围为[-1, 1]，默认为0，正值代表增加曝光，负值代表减少曝光
                 * @param compensation 
                 */
                setExposureCompensation(compensation: number): void;

                /**
                 * 调整图层的geometry error，会影响到该图层的加载时机
                 * @param ratio 
                 */
                setGeometryErrorRatio(ratio: number): void;

                /**
                 * 设置模型基点位置，可设置经纬度高程，也可设置世界坐标
                 * @param location 
                 */
                setLocation(location: { latLon: TLatLon } | { worldPosition: TPosition }): void;

                setOpacity(opacity: number): void;

                setRotationZ(basePoint: TPosition, rotation: number): void;

                setScale(basePoint: TPosition, scale: number): void;

                setTransformation(transformation: Array<any>): void;

                setTranslation(translation: TPosition): void;

                setVisualRange(range: TRange): void;
            }

            /**
             * GroupLayer图层组
             */
            class GroupLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    isVisible?: boolean,
                    /**
                     * 图层数据加载优先级，默认为5，即最低
                     */
                    priority?: number
                });

                addLayer(layer: AnyLayer): void;

                hide(): void;
                show(): void;
            }

            /**
             * 图层管理器
             */
            class LayerManager {
                /**
                 * 在指定GroupLayer下新增图层
                 * @param layer 
                 * @param parentLayerId 父节点图层ID（需为GroupLayer），默认为RootLayer
                 */
                addLayer(layer: AnyLayer, parentLayerId: string): void;

                /**
                 * 通过传入的图层配置信息，加载各图层
                 * @param layerConfigsObject 图层配置对象
                 */
                buildLayers(layerConfigsObject: Object): void;

                getLayer(layerId: string): AnyLayer;

                getLayerByType(type: string): Array<AnyLayer>;

                getLayerConfigsObject(): Object;

                /**
                 * 获取图层加载优先级
                 * @param layerId 
                 */
                getLayerPriority(layerId: string): number;

                getRootLayer(): GroupLayer;

                /**
                 * 移动图层
                 * @param layerId 
                 * @param targetLayerId 父节点图层ID（需为GroupLayer）
                 */
                moveLayer(layerId: string, targetLayerId: string): void;

                removeLayer(layerId: string): void;

                setLayerPriority(layerId: string, priority: number): void;

                showLayers(layerIds: Array<string>): void;

                zoomToLayer(layerId: string, callback: Function): void;
            }

            /**
             * 地形图层
             */
            class TerrainLayer {
                constructor(option: {
                    id: string,
                    name: string
                });

                /**
                 * 获取该图层的拍平管理器
                 */
                getFlatManager(): Glodon.Bimface.Plugins.Flats.FlatManager;

                getId(): string;

                getSource(): Object;

                setSource(source: { url: string }): void;

                /**
                 * 根据经纬度获取世界坐标，高程对应地形高度
                 * @param latLon 
                 * @param callback 
                 */
                getWorldPosition(latLon: { lat: number, lon: number }, callback: (e: TPosition) => void): void;

                hide(): void;
                show(): void;
            }

            type TileSource = {
                url: string,
                provider: "GoogleTile" | "TMS" | "Tianditu" | "BingMap",
                credit: Glodon.Bimface.Common.Credit,
                text?: string,
                link?: string,
                copyright?: string,
                key?: string
            }

            /**
             * 地图图层
             */
            class TileLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    url: string,

                    /**
                     * 	是否投射阴影，默认为false
                     */
                    castShadow?: boolean,

                    /**
                     * 是否接收阴影，默认为true
                     */
                    receiveShadow?: boolean,

                    /**
                     * 地图服务请求的最大层级，默认值为18。当设置值超出地图服务支持的层级范围时，设置无效
                     */
                    maxLevel?: number
                });

                /**
                 * 设置该图层是否投射阴影
                 * @param enable 
                 */
                enableCastShadow(enable: boolean): void;

                /**
                 * 设置该图层是否接收阴影
                 * @param enable 
                 */
                enableReceiveShadow(enable: boolean): void;

                /**
                 * 裁切管理器
                 */
                getClippingManager(): Glodon.Bimface.Plugins.Clipping.ClippingManager;

                getId(): string;
                getMaxLevel(): number;
                getSource(): Object;
                getStyle(): Object;
                hide(): void;
                show(): void;

                /**
                 * 获取该图层是否投射阴影
                 */
                isCastShadowEnabled(): boolean;

                /**
                 * 获取该图层是否接收阴影
                 */
                isReceiveShadowEnabled(): boolean;

                /**
                 * 恢复地图默认显示颜色
                 */
                restoreStyle(): void;

                /**
                 * 设置地图服务请求的最大层级
                 * @param maxLevel 
                 */
                setMaxLevel(maxLevel: number): void;

                setOpacity(opacity: number): void;

                setSource(source: TileSource): void;

                setStyle(style: {
                    template: Glodon.Bimface.Common.ImageStyle,
                    color?: Glodon.Web.Graphics.Color,
                    brightness?: number,
                    contrast?: number,
                    saturation?: number
                }): void;
            }

            /**
             * 倾斜摄影、点云数据图层
             */
            class TilesetLayer {
                constructor(option: {
                    id: string,
                    name: string,
                    viewToken: string,
                    isVisible?: boolean,
                    transformation?: Array<any>,

                    /**
                     * 是否投射阴影，默认为false，选填
                     */
                    castShadow?: boolean,

                    /**
                     * 是否接收阴影，默认为true，选填
                     */
                    receiveShadow?: boolean
                });

                /**
                 * 设置该图层是否投射阴影
                 * @param isEnabled 
                 */
                enableCastShadow(isEnabled: boolean): void;

                /**
                 * 设置该图层是否接收阴影
                 * @param isEnabled 
                 */
                enableReceiveShadow(isEnabled: boolean): void;

                getBoundingBox(): Object;
                getClippingManager(): Glodon.Bimface.Plugins.Clipping.ClippingManager;
                getCurrentVersion(): number;
                getDataManager(): Glodon.Bimface.DataManager;

                /**
                 * 获取图层的曝光补偿
                 */
                getExposureCompensation(): Number;

                /**
                 * 拍平管理器
                 */
                getFlatManager(): Glodon.Bimface.Plugins.Flats.FlatManager;

                /**
                 * 获取该图层的geometry error
                 */
                getGeometryErrorRatio(): number;

                getId(): string;
                getLocation(): { latLon: TLatLon, worldPosition: TPosition };
                getObjectData(): Array<Object>;
                getOpacity(): number;
                getTransformation(): Array<Object>;
                getVisualRange(): TRange;

                hide(): void;
                show(): void;

                /**
                 * 获取该图层是否投射阴影
                 */
                isCastShadowEnabled(): boolean;

                /**
                 * 获取该图层是否接收阴影
                 */
                isReceiveShadowEnabled(): boolean;

                /**
                 * 加载userdata等业务数据 以支持选择过滤等
                 */
                loadBusinessResources(): void;

                /**
                 * 设置图层的曝光补偿，补偿量范围为[-1, 1]，默认为0，正值代表增加曝光，负值代表减少曝光
                 * @param compensation 
                 */
                setExposureCompensation(compensation: number): void;

                /**
                * 调整图层的geometry error，会影响到该图层的加载时机
                * @param ratio 
                */
                setGeometryErrorRatio(ratio: number): void;

                /**
                 * 设置模型基点位置，可设置经纬度高程，也可设置世界坐标
                 * @param location 
                 */
                setLocation(location: { latLon: TLatLon } | { worldPosition: TPosition }): void;

                setOpacity(opacity: number): void;

                setRotationZ(basePoint: TPosition, rotation: number): void;

                setScale(basePoint: TPosition, scale: number): void;

                setTransformation(transformation: Array<any>): void;

                setTranslation(translation: TPosition): void;

                setVisualRange(range: TRange): void;
            }
        }

        namespace Light {
            type AnyLight = SpotLight | DirectionalLight | CSMLight | FillLight

            /**
             * 光源管理器
             * 
             * 获取场景中默认创建的光源管理器对象，无需构造，支持Viewer3D和ViewerGIS 
             *  
             * viewer.getLightManager();
             */
            class LightManager {
                /**
                 * 添加单个光源
                 * @param light 
                 * 
                 * @returns 光源对象ID
                 */
                addLight(light: AnyLight): string;

                /**
                 * 清除所有光源对象，对FillLight、CSMLight不生效
                 */
                clear(): void;

                destroy(): void;

                enableAllLights(isEnabled: boolean): void;

                enableLightsById(ids: Array<string>, isEnabled: boolean): void;

                enableShadowsById(ids: Array<string>, isEnabled: boolean): void;

                getAllDirectionalLights(): Array<DirectionalLight>;

                getAllFillLights(): Array<FillLight>;

                getAllLights(): Array<AnyLight>;

                getAllSpotLights(): Array<SpotLight>;

                getCSMLight(): CSMLight;

                getLightById(id: string): AnyLight;

                removeLightsById(ids: string[]): void;

                /**
                 * 更新光源效果
                 */
                update(): void;
            }

            class LightManagerConfig {
                viewer: TViewer
            }

            class SpotLight {
                constructor(spotLightConfig: SpotLightConfig);

                enableLight(isEnabled: boolean): void;
                enableShadow(isEnabled: boolean): void;
                getAngle(): number;
                getColor(): Glodon.Web.Graphics.Color;
                getDistance(): number;
                getId(): string;
                getIntensity(): number;

                /**
                 * 获取聚光灯衰减的半影范围，可取值[0, 1]，默认为0
                 */
                getPenumbra(): number;

                getPosition(): TPosition;

                getTarget(): Object;

                hide(): void;
                show(): void;

                isEnabled(): boolean;
                setAngle(angle: number): void;
                setColor(color: Glodon.Web.Graphics.Color): void;
                setDistance(distance: number): void;
                /**
                 * 设置聚光灯光线强度，范围[0,3]
                 * @param intensity 
                 */
                setIntensity(intensity: number): void;
                /**
                 * 设置聚光灯衰减的半影范围，可取值[0, 1]，默认为0
                 * @param penumbra 
                 */
                setPenumbra(penumbra): void;
                /**
                 * 设置聚光灯位置
                 * @param position 
                 */
                setPosition(position: TPosition): void;

                /**
                 * 设置聚光灯照射目标
                 * @param target 
                 */
                setTarget(target: object): void;
            }

            class SpotLightConfig {
                /**
                 * 聚光灯的视角范围，单位：弧度，（0，Math.PI / 2）
                 */
                angle: Number

                /**
                 * 聚光灯颜色
                 */
                color: Glodon.Web.Graphics.Color

                /**
                 * 聚光灯可见距离，单位与场景设置单位一致, 必填
                 */
                distance: Number

                /**
                 * 聚光灯ID
                 */
                id: String

                /**
                 * 聚光灯光线强度，由弱到强为[0, 3]
                 */
                intensity: Number

                /**
                 * 聚光灯衰减的半影范围，可取值[0, 1]，默认为0
                 */
                penumbra: Number

                /**
                 * 聚光灯位置，世界坐标系, 必填
                 */
                position: Object

                /**
                 * 是否开启阴影，默认为false
                 */
                shadow: Boolean

                /**
                 * 聚光灯照射方向，世界坐标系, 必填
                 */
                target: Object

            }

            /**
             * 方向光对象
             */
            class DirectionalLight {
                constructor(directionalLightConfig: DirectionalLightConfig);

                /**
                 * 开启/关闭平行光
                 * @param isEnabled 
                 */
                enableLight(isEnabled: boolean): void;

                /**
                 * 是否开启阴影
                 * @param isEnabled 
                 */
                enableShadow(isEnabled: boolean): void;
                getColor(): Glodon.Web.Graphics.Color;
                getDirection(): TVector;
                getId(): string;
                getIntensity(): number;
                isEnabled(): boolean;
                isShadowEnabled(): boolean;
                setColor(color: Glodon.Web.Graphics.Color): void;
                setDirection(direction: TVector): void;
                setDirectionByCondition(latLon: { lat: number, lon: number }, date: Date): void;
                setIntensity(intensity: number): void;
                update(): void;
            }

            class DirectionalLightConfig {
                /**
                 * 方向光的颜色.默认值: Glodon.Web.Graphics.Color(255, 255, 255, 1)
                 */
                color: Glodon.Web.Graphics.Color

                /**
                 * 方向光的投影方向, 用向量对象表示.默认值: { x: 0.64, y: -0.48, z: -0.6 }
                 */
                direction: Object

                /**
                 * 方向光的光照强度，默认为1.0
                 */
                intensity: Number

                /**
                 * 是否开启阴影.默认值: false
                 */
                shadow: Boolean

            }

            /**
             * 场景辅助方向光，用于生成大场景默认阴影。可以控制该对象的开启，关闭及阴影状态，不可移除。
             */
            class CSMLight {
                enableShadow(isEnabled: boolean): void;
                getDirection(): TVector;
                getId(): string;
                isShadowEnabled(): boolean;
                setDirection(direction: TVector): void;
                setDirectionByCondition(latLon: { lat: number, lon: number }, date: Date): void;
            }

            class FillLight {
                enableLight(isEnabled: boolean): void;
                isEnabled(): boolean;
            }
        }

        namespace Marker {

        }

        namespace Model {

            /**
             * BIM单模型类，用以操作该模型内的构件、数据等
             */
            class BimModel {
                /**
                 * 恢复所有构件处于激活状态
                 */
                activateAllComponents(): void;

                /**
                 * 设置对应id的构件处于激活状态
                 * @param ids 
                 */
                activateComponentsById(ids: Array<string>): void;

                /**
                 * 依据筛选条件将构件设置为激活状态
                 * @param conditions 构件筛选条件，筛选字段可通过getObjectDataById方法获取
                 */
                activateComponentsByObjectData(conditions: Array<any>): void;

                /**
                 * 根据构件ID在闪烁状态集合中继续添加构件
                 * @param objectIds `
                 * @param blinkOption 构件闪烁的配置项
                 */
                addBlinkComponentsById(objectIds: Array<string>, blinkOption: TBlinkOption): void;

                /**
                 * 根据筛选条件在闪烁状态集合中继续添加构件
                 * @param objectData 
                 * @param blinkOption 
                 */
                addBlinkComponentsByObjectData(objectData: Array<any>, blinkOption: TBlinkOption): void;

                /**
                 * 根据构件ID在选中集合中继续添加构件
                 * @param ids 
                 */
                addSelectedComponentsById(ids: Array<string>): void;

                /**
                 * 根据筛选条件在选中集合中继续添加构件
                 * @param conditions 构件筛选条件，筛选字段可通过getObjectDataById方法获取
                 */
                addSelectedComponentsByObjectData(conditions: Array<any>): void;

                /**
                 * 将轴网浮在最上层
                 * @param isEnabled 
                 */
                bringAxisGridsToFront(isEnabled: boolean): void;

                /**
                 * 取消所有构件的闪烁状态
                 */
                clearAllBlinkComponents(): void;

                /**
                 * 根据构件ID取消构件的闪烁状态
                 * @param objectIds 
                 */
                clearBlinkComponentsById(objectIds: Array<string>): void;

                /**
                 * 清空模型爆炸效果
                 */
                clearExplosion(): void;

                /**
                 * 清空楼层爆炸效果
                 */
                clearFloorExplosion(): void;

                /**
                 * 清空发光效果
                 */
                clearGlowEffect(): void;

                /**
                 * 取消模型隔离
                 */
                clearIsolation(): void;

                /**
                 * 恢复全部构件的原来颜色
                 */
                clearOverrideColorComponents(): void;

                /**
                 * 清除构件选中状态
                 */
                clearSelectedComponents(): void;

                /**
                 * 根据构件ID将构件设置为未激活状态 当构件被设置为未激活的状态后，构件无法被选择、修改颜色与材质、控制可见性（显示、隐藏）、设置隔离效果，用户可以穿透该构件选择其后方的构件、三维标签
                 * @param ids 
                 */
                deactivateComponentsById(ids: Array<string>): void;

                /**
                 * 根据筛选条件将构件设置为未激活状态 当构件被设置为未激活的状态后，构件无法被选择、修改颜色与材质、控制可见性（显示、隐藏）、设置隔离效果，用户可以穿透该构件选择其后方的构件、三维标签
                 * @param conditions 
                 */
                deactivateComponentsByObjectData(conditions: Array<any>): void;

                /**
                 * 轴号是否一直显示在窗口内，设置为true后，相机范围外的轴号将沿轴线显示在窗口边缘
                 * @param isEnabled 
                 */
                enableShowGridBubblesAlongWithAxis(isEnabled: boolean): void;

                /**
                 * 获取模型三维视图的状态，用于切换三维视图，当rvt文件转换时配置参数"export3DViews": true时可用
                 * @param callback 
                 */
                get3DViewStates(callback: Function): void;

                /**
                 * 获取面积属性
                 * @param id 
                 * @param callback 
                 */
                getAreaProperty(id: string, callback: Function): void;

                /**
                 * 获取空间
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getAreas(successCallback: Function, failureCallback: Function): void;

                /**
                 * 求多个轴线的交点
                 * @param fileId 文件ID，如果是单文件，可不填；如果是集成模型，则为必填项
                 * @param floorId 楼层ID，如果是集成模型，则为单模型文件中的楼层ID（不是集成模型聚合后的楼层ID）
                 * @param axisNumber 相交轴线的轴号数组，例如["9", "A-R", "A-S"]
                 */
                getAxisGridsIntersection(fileId: string, floorId: string, axisNumber: Array<string>): Array<any>;

                /**
                 * 根据fileID获取模型的包围盒
                 * @param fileId 文件ID，集成模型的子文件ID，如果是单文件或者集成文件，可不填(直接输入callback)；
                 * @param callback 
                 */
                getBoundingBox(fileId: string, callback: Function): void;

                /**
                 * 根据构件ID获取包围盒信息
                 * @param id 
                 */
                getBoundingBoxById(id: string): Object;

                /**
                 * 获取图元类别的可见性
                 * @param success 
                 * @param failure 
                 */
                getCategoryVisibility(success: Function, failure: Function): void

                /**
                 * 获取修改后的构件属性
                 * @param id 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getComponentOverriddenProperty(id: string, successCallback: Function, failureCallback: Function): void

                /**
                 * 获取构件属性
                 * @param id 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getComponentProperty(id: string, successCallback: Function, failureCallback: Function): void

                /**
                 * 根据集合ID获取集合中所有构件的ID
                 * @param id 
                 * @param callback 
                 */
                getComponentsBySetId(id: string, callback: Function): void

                /**
                 * 获取构件显示状态 如显示隐藏、半透明、隔离、变色
                 * @param id 
                 */
                getComponentStatus(id: string): object

                /**
                 * 获取当前轴网的状态
                 */
                getCurrentAxisGridsState(): object

                /**
                 * 获取三维标注信息
                 * @param fileId 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getDimensions(fileId: string, successCallback: Function, failureCallback: Function): void

                /**
                 * 根据文件ID和构件ID获取包含该构件的图纸列表
                 * @param fileId 
                 * @param componentId 
                 * @param callback 
                 */
                getDrawingListbyId(fileId: string, componentId: string, callback: Function): void

                /**
                 * 根据图纸ID和模型中的坐标值，获取图纸对应坐标，仅支持rvt导出的单视口平面图纸
                 * @param option 
                 * @param callback 
                 */
                getDrawingPosition(option: {
                    /**
                     * 集成模型的子文件ID，如果是单模型，可以不填写
                     */
                    fileId: string,

                    /**
                     * 图纸ID，可以通过BimModel.getDrawingsheets方法获取
                     */
                    sheetId: string,

                    /**
                     * 模型中的坐标值
                     */
                    point: any
                }, callback: Function): void;

                /**
                 * 获取模型的图纸列表
                 * @param fileId 
                 * @param callback 
                 */
                getDrawingsheets(fileId: string, callback: Function): void;

                /**
                 * 获取模型的图纸目录(前置条件：模型转换时设置参数'exportDrawing': true)
                 * @param fileId 
                 * @param callback 
                 */
                getDrawingTree(fileId: string, callback: Function): void

                /**
                 * 获取爆炸效果离散系数
                 */
                getExplosionExtent(): number;

                /**
                 * 获取族文件类型，仅对rfa文件生效
                 * @param callback 
                 */
                getFamilyTypes(callback: Function): void;

                /**
                 * 获取模型的元素信息对象
                 * @param featureType 
                 */
                getFeatureData(featureType: string): object

                /**
                 * 获取集成模型的文件列表
                 * @param callback 
                 */
                getFiles(callback: Function): void;

                /**
                 * 根据楼层ID获取楼层包围盒
                 * @param floorId 
                 * @param callback 
                 */
                getFloorBoundingBoxById(floorId: string, callback: Function): void;

                /**
                 * 获取楼层爆炸离散方向
                 */
                getFloorExplosionDirection(): TVector;

                /**
                 * 获取楼层爆炸离散系数
                 */
                getFloorExplosionExtent(): number

                /**
                 * 获取参与楼层爆炸的楼层ID列表
                 */
                getFloorExplosionList(): Array<string>

                /**
                 * 获取单模型、集成模型楼层列表
                 * @param callback 
                 */
                getFloors(callback: Function): void

                /**
                 * 在集成模型中根据文件ID获取单模型的楼层信息
                 * @param fileId 
                 * @param callback 
                 */
                getFloorsbyFileId(fileId: string, callback: Function): void;

                /**
                 * 获取轴网轴号的颜色
                 */
                getGridBubblesColor(): Glodon.Web.Graphics.Color

                /**
                 * 获取轴网轴线的颜色
                 */
                getGridLinesColor(): Glodon.Web.Graphics.Color

                /**
                 * 获取模型基本信息，如构件数、三角面、定点数
                 */
                getInformation(): object

                /**
                 * 获取模型集成的平移值
                 * @param callback 
                 */
                getIntegrateTranslation(callback: Function): void;

                /**
                 * 获取隔离构件的颜色
                 */
                getIsolatedComponentColor(): Glodon.Web.Graphics.Color

                /**
                 * 获取集成模型楼层id对应关系
                 * @param callback 
                 */
                getLevelMapping(callback: Function): void

                /**
                 * 获取模型链接信息
                 * @param callback 
                 */
                getLinksInfo(callback: Function): void

                /**
                 * 获取manifest文件的数据
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getManifest(successCallback: Function, failureCallback: Function): void

                /**
                 * 获取模型的小地图信息
                 * @param callback 
                 */
                getMapInfo(callback: Function): void

                /**
                 * 根据筛选条件获取对应构件id列表
                 * @param conditions 
                 */
                getMatchIds(conditions: Array<any>): string[]

                /**
                 * 获取材质属性
                 * @param id 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getMaterialProperty(id: string, successCallback: Function, failureCallback: Function): void

                /**
                 * 根据构件ID获取材质对象
                 * @param id 
                 */
                getMaterialsByComponentId(id: string): Array<any>

                /**
                 * 获取模型中的系统拓扑信息，目前支持rvt文件中的给排水、暖通系统
                 * @param fileId 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getMepSystem(fileId: string, successCallback: Function, failureCallback: Function): void

                /**
                 * 获取两个构件的最小距离
                 * @param componentId1 
                 * @param componentId2 
                 */
                getMinimumComponentDistanceById(componentId1: string, componentId2: string): object

                /**
                 * 获取config文件数据
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getModelInfo(successCallback: Function, failureCallback: Function): void

                /**
                 * 获取模型组属性
                 * @param callback 
                 */
                getModelSet(callback: Function): void

                /**
                 * 获取指定模型的坐标变换状态
                 */
                getModelTransformation(): Array<any>

                /**
                 * 获取模型构件树
                 * @param callback 
                 */
                getModelTree(callback: Function): void

                /**
                 * 获取距指定点最近的轴线及其偏移值
                 * @param point3d 
                 * @param fileId 
                 * @param callback 
                 * 
                 * @example
                    // 构造三维点对象
                    let point = { x: 5000, y: 6000, z: -350 };
                    // 单模型获取指定点最近的轴线
                    viewer.getModel(modelId).getNearestAxisGrids(point, '', function(data) {
                      console.log(data);
                    });
                 */
                getNearestAxisGrids(point3d: TPosition, fileId: string, callback: Function): void

                /**
                 * 获取嵌套构件信息
                 * @param callback 
                 */
                getNestedComponents(callback: Function): void

                /**
                 * 根据构件ID获取ObjectData，用于作为筛选条件
                 * @param objectId 
                 */
                getObjectDataById(objectId: string): object

                /**
                 * 获取构件映射关系
                 * @param callback 
                 */
                getObjectMap(callback: Function): void

                /**
                 * 获取项目参数信息
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getProjectInfo(successCallback: Function, failureCallback: Function): void

                /**
                 * 获取房间属性
                 * @param id 
                 * @param callback 
                 */
                getRoomProperty(id: string, callback: Function): void

                /**
                 * 根据明细表ID获取明细表内容
                 * @param id 
                 * @param callback 
                 */
                getScheduleById(id: string, callback: Function): void

                /**
                 * 获取明细表列表（仅对rvt文件生效，转换时需添加配置项"exportSchedule":"true"）
                 * @param callback 
                 */
                getScheduleList(callback: Function): void

                /**
                 * 获取选中集合中的构件ID数组
                 */
                getSelectedComponents(): Array<string>

                /**
                 * 根据构件ID获取所属集合的信息
                 * @param id 
                 * @param callback 获取集合信息的回调函数，集合信息格式示例{id: "1234", name: "parent", type: "group", elements: ['1','2','3','4',...]}
                 */
                getSetByComponentId(id: string, callback: Function): void

                /**
                 * 隐藏模型全部构件
                 */
                hideAllComponents(): void

                /**
                 * 根据构件ID隐藏构件
                 * @param ids 
                 */
                hideComponentsById(ids: Array<string>): void

                /**
                 * 根据筛选条件隐藏构件
                 * @param conditions 
                 */
                hideComponentsByObjectData(conditions: Array<any>): void

                /**
                 * 根据构件ID隔离构件，其他全部隐藏或半透明
                 * @param ids 多个构件ID的数组，如["x1", "x2"]
                 * @param state 
                 */
                isolateComponentsById(ids: Array<string>, state: Glodon.Bimface.Viewer.IsolateOption): void

                /**
                 * 根据筛选条件隔离构件，其他全部隐藏或半透明
                 * @param conditions 构件筛选条件，筛选字段可通过getObjectDataById方法获取
                 * @param state 
                 */
                isolateComponentsByObjectData(conditions: Array<any>, state: Glodon.Bimface.Viewer.IsolateOption): void

                /**
                 * 取消所有构件半透明
                 */
                opaqueAllComponents(): void

                /**
                 * 根据构件ID取消构件半透明
                 * @param ids 
                 */
                opaqueComponentsById(ids: Array<string>): void

                /**
                 * 根据筛选条件取消构件半透明
                 * @param conditions 
                 */
                opaqueComponentsByObjectData(conditions: Array<any>): void

                /**
                 * 给所有构件着色
                 * @param color 
                 */
                overrideAllComponentsColor(color: Glodon.Web.Graphics.Color): void

                /**
                 * 按构件ID给构件着色
                 * @param ids 
                 * @param color 
                 */
                overrideComponentsColorById(ids: Array<string>, color: Glodon.Web.Graphics.Color): void

                /**
                 * 根据筛选条件给构件着色
                 * @param conditions 
                 * @param color 
                 */
                overrideComponentsColorByObjectData(conditions: Array<any>, color: Glodon.Web.Graphics.Color): void

                /**
                 * 根据条件对构件线框着色
                 * @param condition 
                 * @param color 
                 */
                overrideComponentsFrameColor(condition: TComponentCondition, color: Glodon.Web.Graphics.Color): void

                /**
                 * 按构件ID给构件替换材质
                 * @param ids 
                 * @param material 
                 */
                overrideComponentsMaterialById(ids: Array<string>, material: Glodon.Bimface.Plugins.Material.Material): void

                /**
                 * 按构件ID设置构件的不透明度
                 * @param ids 
                 * @param opacity 
                 */
                overrideComponentsOpacityById(ids: Array<string>, opacity: number): void

                /**
                 * 根据筛选条件设置构件的不透明度
                 * @param conditions 
                 * @param opacity 
                 */
                overrideComponentsOpacityByObjectData(conditions: Array<any>, opacity: number): void

                /**
                 * 隐藏模型中所有的轴网
                 */
                removeAllAxisGrids(): void

                /**
                 * 按文件ID和给定高度移除轴网
                 * @param fileId 
                 * @param elevation 
                 */
                removeAxisGridsByElevation(fileId: string, elevation: number): void

                /**
                 * 按文件ID和楼层ID移除轴网
                 */
                removeAxisGridsByFloor(fileId: string, floorId: string, callback: Function): void

                /**
                 * 根据构件ID移除发光效果
                 * @param ids 
                 */
                removeGlowEffectById(ids: Array<string>): void

                /**
                 * 根据构件ID从选中集合中移除
                 * @param ids 
                 */
                removeSelectedId(ids: Array<string>): void

                /**
                 * 恢复所有默认显示，包括着色、选择、隔离、半透明、空间等
                 */
                restoreAllDefault(): void

                /**
                 * 根据构件ID恢复构件的原来颜色
                 * @param ids 
                 */
                restoreComponentsColorById(ids: Array<string>): void

                /**
                 * 根据筛选条件恢复构件的原来颜色
                 * @param conditions 
                 */
                restoreComponentsColorByObjectData(conditions: Array<any>): void

                /**
                 * 根据条件清除构件线框着色，恢复默认显示
                 * @param condition 
                 */
                restoreComponentsFrameColor(condition: TComponentCondition): void

                /**
                 * 根据构件ID恢复构件的原来材质
                 * @param ids 
                 */
                restoreComponentsMaterialById(ids: Array<string>): void

                /**
                 * 按构件id恢复构件不透明度
                 * @param ids 
                 */
                restoreComponentsOpacityById(ids: Array<string>): void

                /**
                 * 按筛选条件恢复构件不透明度
                 * @param conditions 
                 */
                restoreComponentsOpacityByObjectData(conditions: Array<any>): void

                /**
                 * 恢复默认显示(不含着色)，包括选择、隔离、半透明、空间等
                 */
                restoreDefault(): void

                /**
                 * 恢复隔离状态下其他构件的颜色
                 */
                restoreIsolatedComponentColor(): void

                /**
                 * 对文本进行搜索，暂支持3dm文件
                 * @param text 搜索的文字
                 * @param callback 
                 */
                searchText(text: string, callback: Function): void

                /**
                 * 设置当前轴网的状态
                 * @param state 轴网状态
                 */
                setAxisGridsState(state: object): void;
                /**
                 * 设置闪烁状态的构件颜色
                 * @param color 
                 */
                setBlinkColor(color: Glodon.Web.Graphics.Color): void;
                /**
                 * 根据构件ID设置多个构件为闪烁状态集合
                 * @param objectIds 
                 * @param blinkOption 
                 */
                setBlinkComponentsById(objectIds: string[], blinkOption: TBlinkOption): void;
                /**
                 * 设置闪烁状态颜色变化的间隔时间
                 * @param interval 间隔时间（毫秒），参数为空时恢复为默认，参数 interval <= 0 时无效
                 */
                setBlinkIntervalTime(interval: number): void;
                /**
                 * 根据构件ID设置构件半透明，或取消构件半透明
                 * @param ids 多个构件ID的数组，如["x1", "x2"]
                 * @param state 
                 */
                setComponentsOpacity(ids: Array<string>, state: Glodon.Bimface.Viewer.OpacityOption): void;

                /**
                 * 指定爆炸中心
                 * @param option 
                 */
                setExplosionCenter(option: {
                    /**
                     * 枚举值。当type=“userDefined”时，需输入position；当type=“default”时，为当前未隐藏构件包围盒中心点；
                     */
                    type: "userDefined" | "default",
                    position?: TPosition
                }): void;

                /**
                 * 设置爆炸效果离散系数，需在Viewer3DConfig中设置enableExplosion为true
                 * @param extent 爆炸系数，取值范围[0, 3]
                 */
                setExplosionExtent(extent: number): void;

                /**
                 * 设置楼层爆炸效果，需在Viewer3DConfig中设置enableExplosion为true
                 * @param extent 楼层爆炸离散系数，范围为[0, 30]
                 * @param floorIds 参与楼层爆炸的楼层ID列表，默认全部楼层参与，floorIds=[]时所有楼层不参与楼层爆炸
                 * @param direction 楼层爆炸的方向，缺省值为{x: 0, y: 0, z: 1}
                 */
                setFloorExplosion(extent: number, floorIds: string[], direction: TVector): void;

                /**
                 * 根据构件ID设置发光效果
                 * @param ids 
                 * @param option 
                 */
                setGlowEffectById(ids: string[], option: TGlowEffectOptions): void;

                /**
                 * 设置轴网轴号的颜色
                 * @param color 
                 */
                setGridBubblesColor(color: Glodon.Web.Graphics.Color): void;

                /**
                 * 设置轴网轴线的颜色
                 * @param color 
                 */
                setGridLinesColor(color: Glodon.Web.Graphics.Color): void;

                /**
                 * 设置隔离构件的颜色
                 * @param color 
                 */
                setIsolatedComponentColor(color: Glodon.Web.Graphics.Color): void;

                setModelRotationX(basePoint: TPosition, rotation: number): void;
                setModelRotationY(basePoint: TPosition, rotation: number): void;
                setModelRotationZ(basePoint: TPosition, rotation: number): void;
                setModelScale(basePoint: TPosition, scale: number): void;
                setModelTransformation(modelTransformation: Array<any>): void;
                setModelTranslation(translation: TPosition): void;
                setSelectedComponentsById(ids: string[]): void;
                setSelectedComponentsByObjectData(conditions: Array<object>): void;
                /**
                 * 设置半透明构件的颜色
                 * @param color 
                 */
                setTransparentedComponentColor(color: Glodon.Web.Graphics.Color): void;

                /**
                 * 显示所有轴网
                 */
                showAllAxisGrids(): void;
                /**
                 * 按文件ID和高度显示轴网
                 * @param fileId 文件ID，如果是单文件，可不填；如果是集成模型，则为必填项
                 * @param elevation 
                 * @param callback 
                 */
                showAxisGridsByElevation(fileId: string, elevation: number, callback: Function): void;
                /**
                 * 按文件ID和楼层ID显示轴网
                 * @param fileId 文件ID，如果是单文件，可不填；如果是集成模型，则为必填项
                 * @param floorId 楼层ID，如果是集成模型，则为单模型文件中的楼层ID（不是集成模型聚合后的楼层ID）
                 * @param callback 
                 */
                showAxisGridsByFloor(fileId: string, floorId: string, callback: Function): void;
                /**
                 * 根据构件ID显示构件
                 * @param ids 
                 */
                showComponentsById(ids: string[]): void;

                /**
                 * 根据筛选条件显示构件
                 * @param conditions 
                 */
                showComponentsByObjectData(conditions: Array<any>): void;
                /**
                 * 根据筛选条件显示构件，其余全部隐藏
                 * @param conditions 
                 */
                showExclusiveComponentsByObjectData(conditions: Array<object>, progressCallback: Function, finishCallback: Function): void;

                /**
                 * 切换族类型，仅对rfa文件生效
                 * @param id 族类型ID
                 */
                showFamilyTypeById(id: string): void;

                /**
                 * 根据平面拆分构件
                 * @param id 被拆分的构件ID
                 * @param plane 拆分用的平面对象，如{point, normal}
                 * 
                 * @example
                 *  let splitPlane = { 
                 *      point: { x: 198896, y: 3793, z: 14415 }, 
                 *      normal: { x: 0.99936, y: 0.03574, z: 0 } };
                    // 切分指定构件
                    let splitComponentArr = viewer.getModel(modelId).splitComponentByPlane(objectId, splitPlane);
                 */
                splitComponentByPlane(id: string, plane: { point: TPosition, normal: TVector }): Array<any>

                /**
                 * 根据多段线拉伸平面拆分构件
                 * @param id 
                 * @param plane 
                 */
                splitComponentByStretchedPlane(id: string, plane: { point: TPosition[], stretch: { direction: TVector } }): Array<any>
                /**
                 * 所有构件半透明
                 */
                transparentAllComponents(): void

                /**
                 * 根据构件ID设置构件为半透明
                 * @param ids 
                 */
                transparentComponentsById(ids: Array<string>): void

                /**
                 * 根据筛选条件设置构件为半透明
                 * @param conditions 
                 */
                transparentComponentsByObjectData(conditions: Array<object>): void

                /**
                 * 缩放到加入选中集合的构件
                 * @param margin 包围盒缩放比例, 缺省值: 1, margin > 0 模型缩小（包围盒变大），margin < 0 模型放大（包围盒变小）
                 * @param callback 缩放完成时的回调函数，可不写
                 * @param duration 动画持续时间，单位为毫秒，默认值为1000ms
                 */
                zoomToSelectedComponents(margin: number, callback?: Function, duration?: number): void
            }

            /**
             * BIM单图纸类，用以操作该图纸内的图元、数据等
             */
            class Drawing {
                /**
                 * 清除图元高亮
                 */
                clearHighlight(): void;

                /**
                 * 清除图元选中
                 */
                clearSelection(): void;

                /**
                 * 结束移动图纸
                 */
                endMoving(): void;

                /**
                 * 三维集成模型构件ID换取对应的图纸图元ID
                 * @param fileId 文件ID
                 * @param rvtId 
                 */
                fromLinkRevitId(fileId: string, rvtId: string): string;

                /**
                 * 根据轴线名称获取多个轴线的交点信息
                 * @param axisNames 
                 * @param callback 
                 */
                getAxisGridsIntersection(axisNames: string[], callback: Function): void;

                /**
                 * 获取图纸解析的轴网信息
                 * @param callback 
                 */
                getAxisInfo(callback: Function): void;

                /**
                 * 获取图框信息
                 * @param callback 
                 */
                getDrawingFrame(callback: Function): void;

                /**
                 * 获取图纸的坐标变换矩阵
                 */
                getDrawingTransformation(): Array<any>;

                /**
                 * 获取图纸的外部参照文件信息
                 * @param successCallback 
                 * @param failureCallback 
                 */
                getExternalReferences(successCallback: Function, failureCallback: Function): void;

                /**
                 * 获取图纸信息
                 */
                getInformation(): object;

                /**
                 * 根据图元获取图层ID
                 * @param objectIds 
                 */
                getLayerIdsByObjects(objectIds: string[]): string[]

                /**
                 * 获取所有图层的数据
                 */
                getLayers(): any[]

                /**
                 * 根据图元ID获取图元包围盒
                 * @param objectId 
                 */
                getObjectBoundingBox(objectId: string): any[]

                /**
                 * 根据包围盒选择图元
                 * @param viewId 
                 * @param boundingBox 包围盒
                 * @param selectionMode 选择模式，"Window"为窗口模式，"Crossing"为窗交模式,默认"Window"
                 * @param enableViewport 是否允许获取视口中的图元，默认为false
                 */
                getObjectsByBoundingBox(viewId: string, boundingBox: object, selectionMode: string, enableViewport: boolean): string[]

                /**
                 * 根据图层ID获取图元
                 * @param layerId 图层ID
                 * @param viewId 视图ID，默认为当前视图
                 */
                getObjectsByLayerId(layerId: string, viewId: string): string[];

                /**
                 * 获取图纸的显示信息(metadata数据)
                 * @param callback 
                 * 
                 * @example
                    {
                      metadata: {
                      fileType: "dwg";
                      gz: true;
                      hasLayout: false;
                      links: "";
                      renderSize: 174;
                      split: false;
                      time: "2020-09-29 23:21:23";
                      version::"2";
                      }
                    }
                 */
                getRenderInfo(callback: Function): void;

                /**
                 * 获取图纸相对于初始状态缩放的比例因子
                 */
                getScaleFactor(): number;

                /**
                 * 获取选中集合中的图元ID数组
                 */
                getSelectedObjects(): string[];

                /**
                 * 获取包围盒内的文本
                 * @param option 
                 * @param callback 
                 */
                getTextByBoundingBox(option: {
                    /**
                     * 	视图ID，默认为当前视图
                     */
                    viewId: number,
                    boundingBox: object
                }, callback: Function): void

                /**
                 * 根据文本图元ID获取文本内容
                 * @param objectId 
                 * @param callback 
                 */
                getTextById(objectId: string, callback: Function): void;

                /**
                 * 获取所有视图信息，包括id和name
                 */
                getViews(): any[]

                /**
                 * 隐藏图层
                 * @param option 
                 */
                hideLayers(option: {
                    layerIds: string[],
                    all: boolean
                }): void

                /**
                 * 隐藏图元
                 * @param option 
                 */
                hideObjects(option: {
                    objectIds: string[],
                    all: boolean
                }): void;

                /**
                 * 高亮图元，仅对当前视图生效
                 * @param option 
                 */
                highLight(option: {
                    layerIds: string[],
                    objectIds: any[],
                    viewportId: string
                }): void;

                /**
                 * 图层颜色
                 * @param option 
                 * @param color 
                 */
                overrideLayersColor(option: {
                    layerIds: string[],
                    all: boolean
                }, color: Glodon.Web.Graphics.Color): void;

                /**
                 * 图元着色
                 * @param option 
                 * @param color 
                 */
                overrideObjectsColor(option: {
                    objectIds: string[],
                    all: boolean
                }, color: Glodon.Web.Graphics.Color): void;

                /**
                 * 清除图层着色
                 * @param option 
                 */
                restoreLayersColor(option: {
                    layerIds: string[],
                    all: boolean
                }): void;

                /**
                 * 清除图元着色
                 * @param option 
                 */
                restoreObjectsColor(option: {
                    objectIds: string[],
                    all: boolean
                }): void;

                /**
                 * 根据基点和比例因子缩放图纸
                 * @param basePoint 缩放的基点，缩放后该点的坐标不会发生变化
                 * @param ratio 图纸相对于初始状态缩放的比例因子
                 */
                scale(basePoint: TPosition, ratio: number): void

                /**
                 * 对打开的CAD图纸的文本进行检索
                 * @param option 
                 * @param successCallback 
                 * @param failureCallback 
                 */
                search(option: { text: string }, successCallback: Function, failureCallback: Function): void;

                /**
                 * 选中图元，仅对当前视图生效
                 * @param option 
                 */
                select(option: {
                    /**
                     * 图层ID的数组，默认为[]，填写后选中图层中的所有图元
                     */
                    layerIds: string[],
                    /**
                     * 图元ID的数组，默认为[]
                     */
                    objectIds: string[],
                    /**
                     * 视口ID，默认为空，适用于layout视图，指定视口后，仅视口中的图元被选中，仅对objectIds参数生效
                     */
                    viewportId: string
                }): void;

                /**
                 * 设置图纸的坐标变换
                 */
                setDrawingTransformation(transformation: any[]): void

                setOpacity(opacity: number): void;

                showLayers(option: {
                    layerIds: string[],
                    all: boolean
                }): void;

                /**
                 * 显示图元
                 * @param option 
                 */
                showObjects(option: {
                    objectIds: string[],
                    all: boolean
                }): void;

                /**
                 * 开始移动图纸
                 */
                startMoving(): void;

                /**
                 * 三维构件ID换取对应的图纸图元ID
                 * @param objectId 
                 * @param callback 
                 */
                toDrawingId(objectId: string, callback: Function): number;

                /**
                 * 通过UCS坐标获取图纸模型空间对应的世界坐标
                 * @param userPosition 
                 */
                userToWorld(userPosition: TPosition): TPosition;

                /**
                 * 通过世界坐标获取UCS坐标
                 * @param worldPosition 
                 */
                worldToUser(worldPosition: TPosition): TPosition

                /**
                 * 缩放并高亮图元
                 * @param option 
                 */
                zoomToObject(option: {
                    /**
                     * 视口ID，默认为空，指定视口后，可以定位至视口中的图元
                     */
                    viewportId: string,

                    /**
                     * 图元ID
                     */
                    objectId: string,

                    /**
                     * 缩放比例，默认为0.5
                     */
                    ratio: string
                }): void;
            }
        }

        namespace Module {

        }

        namespace Plugins {

            type TEffect = Glodon.Bimface.Plugins.Anchor.PrismPoint | Glodon.Bimface.Plugins.Animation.CurveAnimation | Glodon.Bimface.Plugins.Animation.WaterEffect | Glodon.Bimface.Plugins.Animation.FanScanEffect | Glodon.Bimface.Plugins.Animation.RingScanEffect | Glodon.Bimface.Plugins.SkyBox.SkyBoxManager | Glodon.Bimface.Plugins.WeatherEffect.Rain | Glodon.Bimface.Plugins.ParticleSystem.FireEffect | Glodon.Bimface.Plugins.Animation.WallEffect;

            namespace Anchor {
                class PrismPoint {

                }
            }

            namespace Animation {
                class CurveAnimation {

                }

                class FanScanEffect {

                }

                class PathAnimation {

                }

                class RingScanEffect {

                }

                class WallEffect {

                }

                class WaterEffect {

                }
            }

            namespace Clipping {
                class ClippingManager {

                }
            }

            namespace Flats {
                class FlatManager {

                }
            }

            namespace Material {
                class Material {

                }
            }

            namespace ParticleSystem {
                class FireEffect {

                }
            }

            namespace SkyBox {
                class SkyBoxManager {

                }
            }

            namespace WeatherEffect {
                class Rain {

                }
            }
        }

        namespace Tiles {
            namespace UI {
                class UIManager {

                }
            }
        }

        namespace UI {

        }

        namespace Utils {

        }

        namespace Viewer {
            class Viewer3D {

            }

            class ViewerGIS {

            }

            class ViewerDrawing {

            }

            class AxisOption {

            }

            class IsolateOption {

            }

            class OpacityOption {

            }
        }
    }

    namespace Web {
        namespace Algorithm {

        }

        namespace Common {

        }

        namespace Geometry {

        }

        namespace Graphics {
            /**
             * 颜色类，通过Red、Green、Blue、Alpha值创建颜色对象
             */
            class Color {
                constructor(red: number, green: number, blue: number, alpha: number);
            }
        }

        namespace Lang {

        }
    }
}