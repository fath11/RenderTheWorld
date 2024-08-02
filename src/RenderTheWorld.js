// @ts-nocheck
// 依赖库
import * as THREE from "./three.js";

import { OBJLoader } from "./OBJLoader.js";
import { OrbitControls } from "./OrbitControls.js";
import { MTLLoader } from "./MTLLoader.js";
import { GLTFLoader } from "./GLTFLoader.js";
import WebGL from "./WebGL.js";
import {
    chen_RenderTheWorld_picture,
    chen_RenderTheWorld_icon,
} from "./assets/index.js";

(function (Scratch) {
    "use strict";

    const hackFun = (runtime) => {
        if (!runtime || hackFun.hacked) return;
        hackFun.hacked = true;

        // By Nights: 支持XML的BlockType
        if (!Scratch.BlockType.XML) {
            Scratch.BlockType.XML = "XML";
            const origFun = runtime._convertForScratchBlocks;
            runtime._convertForScratchBlocks = function (
                blockInfo,
                categoryInfo,
            ) {
                if (blockInfo.blockType === Scratch.BlockType.XML) {
                    return {
                        info: blockInfo,
                        xml: blockInfo.xml,
                    };
                }
                return origFun.call(this, blockInfo, categoryInfo);
            };
        }
    };

    const PICTRUE = {
        plus: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NC41NzI3MyIgaGVpZ2h0PSI4NC41NzI3MyIgdmlld0JveD0iMCwwLDg0LjU3MjczLDg0LjU3MjczIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc3LjcxMzYzLC0xMzcuNzEzNjMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI5My42ODIxNiwxODAuMDI1NDRoNTIuNjM1NjgiIHN0cm9rZT0iIzlhYjNmZiIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMyMC4xMjQ4NiwxNTMuNjgyNThsLTAuMzAwNTcsNTIuNjM0ODMiIHN0cm9rZT0iIzlhYjNmZiIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI3Ny43MTM2MywyMjIuMjg2MzZ2LTg0LjU3MjczaDg0LjU3Mjczdjg0LjU3MjczeiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjwvZz48L3N2Zz4=",
        minus: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NC41NzI3MyIgaGVpZ2h0PSI4NC41NzI3MyIgdmlld0JveD0iMCwwLDg0LjU3MjczLDg0LjU3MjczIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc3LjcxMzYzLC0xMzcuNzEzNjQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI5My42ODIxNiwxODAuMDI1NDNoNTIuNjM1NjgiIHN0cm9rZT0iIzlhYjNmZiIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI3Ny43MTM2NCwyMjIuMjg2Mzd2LTg0LjU3MjczaDg0LjU3Mjczdjg0LjU3MjczeiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjwvZz48L3N2Zz4=",
    };

    const BLOCK_DEFAULT = {
        connect: ["DEFAULT", "DEFAULT2"],
        arit: ["DEFAULT", "OPER", "DEFAULT2"],
        array: [],
        object: [],
        broadcastWithData: [],
        if: [],
    };

    let expandableBlockInit = false;
    const setExpandableBlocks = (runtime, extension) => {
        if (expandableBlockInit) return;
        expandableBlockInit = true;
        // 在编辑器获取scratchBlocks与获取VM的方法来自 https://github.com/FurryR/lpp-scratch 的LPP扩展
        const hijack = (fn) => {
            const _orig = Function.prototype.apply;
            Function.prototype.apply = (thisArg) => thisArg;
            const result = fn();
            Function.prototype.apply = _orig;
            return result;
        };
        const getScratch = (runtime) => {
            function getEvent(e) {
                return e instanceof Array ? e[e.length - 1] : e;
            }
            const vm = hijack(getEvent(runtime._events["QUESTION"])).props.vm;
            const scratchBlocks = hijack(
                getEvent(vm._events["EXTENSION_ADDED"]),
            )?.ScratchBlocks;
            return {
                scratchBlocks: scratchBlocks,
                vm: vm,
            };
        };
        // 创建按钮
        const createButtons = (Blockly) => {
            // 按钮
            class FieldButton extends Blockly.FieldImage {
                constructor(src) {
                    super(src, 25, 25, undefined, false);
                    this.initialized = false;
                }
                init() {
                    // Field has already been initialized once.
                    super.init();
                    if (!this.initialized) {
                        // 初始化按钮
                        Blockly.bindEventWithChecks_(
                            this.getSvgRoot(),
                            "mousedown",
                            this,
                            (e) => {
                                e.stopPropagation();
                                // 阻止事件冒泡，要不然你点按钮就会执行积木（点击积木）
                            },
                        );
                        Blockly.bindEventWithChecks_(
                            this.getSvgRoot(),
                            "mouseup",
                            this,
                            this.handleClick.bind(this),
                        );
                        // 绑定上这个按钮点击事件
                    }
                    this.initialized = true;
                }
                handleClick(e) {
                    if (!this.sourceBlock_ || !this.sourceBlock_.workspace) {
                        return false;
                    }
                    if (this.sourceBlock_.workspace.isDragging()) {
                        return false;
                    }
                    if (this.sourceBlock_.isInFlyout) {
                        return false;
                    }
                    this.onclick(e);
                }
                onclick(e) {
                    // 子类实现
                }
            }
            // + 按钮
            class PlusButton extends FieldButton {
                constructor() {
                    super(plusImage);
                }
                onclick() {
                    const block = this.sourceBlock_;
                    // 增加积木数量改变
                    block.itemCount_ += 1;
                    block.updateShape(); // 更新
                }
            }
            // - 按钮
            class MinusButton extends FieldButton {
                constructor() {
                    super(minusImage);
                }
                onclick() {
                    // 获取这个 field 的积木
                    const block = this.sourceBlock_;
                    // 增加积木数量改变
                    block.itemCount_ -= 1;
                    if (block.itemCount_ < 0) {
                        // 不能有 -1 个参数
                        block.itemCount_ = 0;
                    }
                    block.updateShape(); // 更新
                }
            }
            // 图片
            const minusImage = PICTRUE.minus;
            const plusImage = PICTRUE.plus;

            return {
                PlusButton,
                MinusButton,
            };
        };

        const createExpandableBlock = (runtime, Blockly) => {
            const { PlusButton, MinusButton } = createButtons(Blockly);
            // 这个是scratch函数的utils
            const ProcedureUtils = Blockly.ScratchBlocks.ProcedureUtils;

            return {
                attachShadow_: function (input, argumentType, text) {
                    if (argumentType == "number" || argumentType == "string") {
                        let blockType =
                            argumentType == "number" ? "math_number" : "text";
                        Blockly.Events.disable();
                        let newBlock;
                        try {
                            newBlock = this.workspace.newBlock(blockType);
                            if (argumentType == "number") {
                                newBlock.setFieldValue(
                                    Scratch.Cast.toString(text),
                                    "NUM",
                                );
                            } else if (argumentType == "string") {
                                newBlock.setFieldValue(
                                    Scratch.Cast.toString(text),
                                    "TEXT",
                                );
                            }
                            newBlock.setShadow(true);
                            if (!this.isInsertionMarker()) {
                                newBlock.initSvg();
                                newBlock.render(false);
                            }
                        } finally {
                            Blockly.Events.enable();
                        }
                        if (Blockly.Events.isEnabled()) {
                            Blockly.Events.fire(
                                new Blockly.Events.BlockCreate(newBlock),
                            );
                        }
                        newBlock.outputConnection.connect(input.connection);
                    }
                },
                updateShape: function () {
                    let wasRendered = this.rendered;
                    this.rendered = false;

                    // 更新参数
                    Blockly.Events.setGroup(true);
                    // 先记录现在的 mutation
                    let oldExtraState = Blockly.Xml.domToText(
                        this.mutationToDom(this),
                    );

                    // 创建新的积木
                    let opcode_ = this.opcode_,
                        expandableArgs = this.expandableArgs,
                        inputKeys = Object.keys(expandableArgs),
                        i;
                    for (i = 1; i <= this.itemCount_; i++) {
                        if (!this.getInput(`${inputKeys[0]}_${i}`)) {
                            for (let j = 0; j < inputKeys.length; j++) {
                                let inputKey = inputKeys[j],
                                    inputKeyID = `${inputKey}_${i}`;

                                this.ARGS.push(inputKeyID);
                                let input,
                                    type = expandableArgs[inputKey][0],
                                    text = expandableArgs[inputKey][1] || null,
                                    canEndInput =
                                        expandableArgs[inputKey][2] || 0;

                                input =
                                    type === "substack"
                                        ? this.appendStatementInput(inputKeyID)
                                        : type === "list" || type === "text"
                                            ? this.appendDummyInput(inputKeyID)
                                            : this.appendValueInput(inputKeyID);
                                if (type === "text") {
                                    input.appendField("text");
                                } else if (type === "boolean") {
                                    input.setCheck("Boolean");
                                } else if (type === "list") {
                                    input.appendField(
                                        new Blockly.FieldDropdown(text),
                                        inputKeyID,
                                    );
                                    const fields = runtime
                                        .getEditingTarget()
                                        ?.blocks.getBlock(this.id)?.fields;
                                    if (fields) {
                                        fields[inputKeyID] = {
                                            id: null,
                                            name: inputKeyID,
                                            value: "+",
                                        };
                                    }
                                    this.moveInputBefore(inputKeyID, "END");
                                } else if (type === "substack") {
                                    input.setCheck(null);
                                } else {
                                    this.attachShadow_(input, type, text);
                                }
                            }
                        }
                    }
                    if (runtime._editingTarget) {
                        // 移除 input 并记录

                        if (this.getInput("SUBSTACK")) {
                            try {
                                const blocks = runtime._editingTarget.blocks;
                                const targetBlock = blocks.getBlock(this.id);
                                const input = targetBlock.inputs["SUBSTACK"];
                                if (input) {
                                    if (input.block !== null) {
                                        const blockInInput =
                                            targetBlock.getBlock(input.block);
                                        blockInInput.topLevel = true;
                                        blockInInput.parent = null;
                                        blocks.moveBlock({
                                            id: blockInInput.id,
                                            oldParent: this.id,
                                            oldInput: "SUBSTACK",
                                            newParent: undefined,
                                            newInput: undefined,
                                        });
                                    }
                                    if (
                                        input.shadow !== null &&
                                        input.shadow == input.block
                                    ) {
                                        blocks.deleteBlock(input.shadow);
                                    }
                                }
                                this.removeInput("SUBSTACK");
                                delete targetBlock.inputs["SUBSTACK"];
                            } catch {
                                // nothing
                            }
                        }

                        let iTemp = i;
                        for (let j = 0; j < inputKeys.length; j++) {
                            i = iTemp;
                            const blocks = runtime._editingTarget.blocks;
                            const targetBlock = blocks.getBlock(this.id);
                            const toDel = [];
                            let inputKey = inputKeys[j],
                                inputKeyID = `${inputKey}_${i}`,
                                type = expandableArgs[inputKey][0];
                            while (this.getInput(inputKeyID)) {
                                this.ARGS.pop(inputKeyID);
                                const input = targetBlock.inputs[inputKeyID];
                                if (input) {
                                    if (input.block !== null) {
                                        const blockInInput = blocks.getBlock(
                                            input.block,
                                        );
                                        blockInInput.topLevel = true;
                                        blockInInput.parent = null;
                                        blocks.moveBlock({
                                            id: blockInInput.id,
                                            oldParent: this.id,
                                            oldInput: inputKeyID,
                                            newParent: undefined,
                                            newInput: undefined,
                                            //newCoordinate: e.newCoordinate
                                        });
                                    }
                                    if (input.shadow !== null) {
                                        if (input.shadow == input.block)
                                            blocks.deleteBlock(input.shadow);
                                        else blocks.deleteBlock(input.block);
                                    }
                                }
                                this.removeInput(inputKeyID);
                                if (type === "list") {
                                    const fields = runtime
                                        .getEditingTarget()
                                        ?.blocks.getBlock(this.id)?.fields;
                                    if (fields) {
                                        delete fields[inputKeyID];
                                    }
                                } else {
                                    toDel.push(inputKeyID);
                                }
                                i++;
                            }
                            setTimeout(() => {
                                toDel.forEach((i) => {
                                    delete targetBlock.inputs[i];
                                });
                            }, 0);
                        }
                    }

                    // 移动按钮
                    this.removeInput("BEGIN");
                    if (this.itemCount_ > 0) {
                        this.appendDummyInput("BEGIN").appendField(
                            this.textBegin,
                        );
                        this.moveInputBefore("BEGIN", "BEGIN");
                    }

                    const getArg = (str) => {
                        let str_ = str.match(/^[A-Z0-9]+/);
                        if (Array.isArray(str_)) {
                            str_ = str_[0];
                            let num_ = Number(str.replace(str_ + "_", ""));
                            return [str_, isNaN(num_) ? 1 : num_];
                        } else {
                            return false;
                        }
                    };
                    let inputList = this.inputList;
                    for (i = 0; i < inputList.length; i++) {
                        let name = inputList[i].name,
                            args = getArg(name);
                        if (
                            args === false &&
                            this.defaultText &&
                            Array.isArray(this.defaultText) &&
                            i === this.defaultIndex
                        ) {
                            this.inputList[
                                this.defaultIndex
                            ].fieldRow[0].setText(
                                this.itemCount_ === 0
                                    ? this.defaultText[0]
                                    : this.defaultText[1],
                            );
                        } else {
                            if (expandableArgs[args[0]]) {
                                let arg = expandableArgs[args[0]],
                                    type = arg[0],
                                    text = arg[1],
                                    rule = arg[2] || 0;
                                if (type === "text") {
                                    if (rule === 1) {
                                        if (Array.isArray(text)) {
                                            this.inputList[
                                                i
                                            ].fieldRow[0].setText(
                                                args[1] === 1
                                                    ? text[0]
                                                    : text[1],
                                            );
                                        } else
                                            this.inputList[
                                                i
                                            ].fieldRow[0].setText(text);
                                    } else {
                                        let flag1 =
                                            args[1] !== 1 &&
                                            args[1] !== this.itemCount_,
                                            index = inputKeys.indexOf(args[0]),
                                            flag2 =
                                                index > 0 &&
                                                index < inputKeys.length - 1,
                                            flag3 = args[1] > 1 || index > 0,
                                            flag4 =
                                                args[1] < this.itemCount_ ||
                                                index < inputKeys.length - 1;
                                        if (
                                            flag1 ||
                                            flag2 ||
                                            (flag3 && flag4)
                                        ) {
                                            this.inputList[
                                                i
                                            ].fieldRow[0].setText(text);
                                            this.inputList[i].setVisible(true);
                                        } else {
                                            this.inputList[
                                                i
                                            ].fieldRow[0].setText("");
                                            this.inputList[i].setVisible(false);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (i = 1; i <= this.itemCount_; i++) {
                        for (let j = 0; j < inputKeys.length; j++) {
                            this.moveInputBefore(`${inputKeys[j]}_${i}`, null);
                        }
                    }
                    this.removeInput("END");
                    if (this.itemCount_ > 0) {
                        this.appendDummyInput("END").appendField(this.textEnd);
                        this.moveInputBefore("END", null);
                    }
                    this.removeInput("MINUS");
                    if (this.itemCount_ > 0) {
                        this.minusButton = new MinusButton();
                        this.appendDummyInput("MINUS").appendField(
                            this.minusButton,
                        );
                        this.moveInputBefore("MINUS", null);
                    }
                    this.moveInputBefore("PLUS", null);

                    // 更新 oldItemCount，oldItemCount用于生成domMutation的
                    this.oldItemCount = this.itemCount_;
                    // 新的 mutation
                    const newExtraState = Blockly.Xml.domToText(
                        this.mutationToDom(this),
                    );
                    if (oldExtraState != newExtraState) {
                        // 判断是否一样，不一样就fire一个mutation更新事件
                        Blockly.Events.fire(
                            new Blockly.Events.BlockChange(
                                this,
                                "mutation",
                                null,
                                oldExtraState,
                                newExtraState, // 状态
                            ),
                        );
                        setTimeout(() => {
                            const target = runtime._editingTarget;
                            const block = target.blocks._blocks[this.id];
                            try {
                                Object.keys(block.inputs).forEach((name) => {
                                    let argName = name.match(/^[A-Z0-9]+/)[0];
                                    if (
                                        !this.ARGS.includes(name) &&
                                        this.expandableArgs[argName] &&
                                        this.expandableArgs[argName][0] !==
                                        "text"
                                    ) {
                                        target.blocks.deleteBlock(
                                            block.inputs[name].shadow,
                                            {
                                                source: "default",
                                                targetId: target.id,
                                            },
                                        );
                                        delete block.inputs[name];
                                        if (runtime.emitTargetBlocksChanged) {
                                            runtime.emitTargetBlocksChanged(
                                                target.id,
                                                [
                                                    "deleteInput",
                                                    {
                                                        id: block.id,
                                                        inputName: name,
                                                    },
                                                ],
                                            );
                                        }
                                    }
                                });
                            } catch {
                                // nothing
                            }
                        }, 0);
                    }
                    Blockly.Events.setGroup(false);

                    this.rendered = wasRendered;
                    if (wasRendered && !this.isInsertionMarker()) {
                        this.initSvg();
                        this.render();
                    }
                },
                mutationToDom: function () {
                    // 可以保存别的数据，会保存到sb3中，oldItemCount就是有多少个参数
                    const container = document.createElement("mutation");
                    container.setAttribute("items", `${this.oldItemCount}`);
                    return container;
                },
                domToMutation: function (xmlElement) {
                    // 读取 mutationToDom 保存的数据
                    this.itemCount_ = parseInt(
                        xmlElement.getAttribute("items"),
                        0,
                    );
                    this.updateShape(); // 读了之后更新
                },
                init: function (type) {
                    // 积木初始化
                    this.itemCount_ = 0;
                    this.oldItemCount = this.itemCount_;
                    this.opcode_ = type.opcode;
                    this.expandableBlock = type.expandableBlock;
                    this.expandableArgs = this.expandableBlock.expandableArgs;
                    this.textBegin = this.expandableBlock.textBegin;
                    this.textEnd = this.expandableBlock.textEnd;
                    this.defaultIndex = this.expandableBlock.defaultIndex || 0;
                    this.defaultText = this.expandableBlock.defaultText;
                    this.plusButton = new PlusButton();
                    this.ARGS = [];

                    if (this.removeInput) this.removeInput("PLUS");
                    this.appendDummyInput("PLUS").appendField(this.plusButton);
                    if (this.moveInputBefore)
                        this.moveInputBefore("PLUS", null);
                },
            };
        };
        const { id, blocks: blocksInfo } = extension.getInfo();
        let expandableBlocks = {};
        blocksInfo.forEach((block) => {
            if (block.expandableBlock)
                expandableBlocks[`${id}_${block.opcode}`] = {
                    opcode: block.opcode,
                    expandableBlock: block.expandableBlock,
                };
        });
        const { scratchBlocks } = getScratch(runtime);
        if (!scratchBlocks) return;
        const expandableAttr = createExpandableBlock(runtime, scratchBlocks);
        scratchBlocks.Blocks = new Proxy(scratchBlocks.Blocks, {
            set(target, property, value) {
                // 设置
                if (expandableBlocks[property]) {
                    Object.keys(expandableAttr).forEach((key) => {
                        if (key != "init") {
                            // 除了init设置
                            value[key] = expandableAttr[key];
                        }
                    });
                    const orgInit = value.init;
                    value.init = function () {
                        // 先用原本的init
                        orgInit.call(this);
                        // init expandable
                        expandableAttr.init.call(
                            this,
                            expandableBlocks[property],
                        );
                    };
                }

                // if (property == "sb_CreporterRun") {
                //   const orgInit = value.init;
                //   value.init = function () {
                //     // 先用原本的 init
                //     orgInit.call(this);
                //     // 你要搞的999神秘的事情
                //     this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
                //   };
                // }
                //保证C型reporter积木样式正常
                return Reflect.set(target, property, value);
            },
        });
    };

    /*
    * By: Xeltalliv
    * Link: https://github.com/Xeltalliv/extensions/blob/webgl2-dev/extensions/webgl2.js
    *
    * Modified by: Fath11
    * Link: https://github.com/fath11
    *
    * Please keep this comment if you wanna use this code :3
    */
    class Skins {
        constructor(runtime) {
            this.runtime = runtime
            const Skin = this.runtime.renderer.exports.Skin

            class CanvasSkin extends Skin {
                constructor(id, renderer) {
                    super(id, renderer)
                    this.gl = renderer._gl
                    const texture = this.gl.createTexture()
                    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
                    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,255,0,255]));
                    this._texture = texture
                    this._rotationCenter = [320, 180]
                    this._size = [640, 360]
                }
                dispose() {
                    if (this._texture) {
                        this.renderer.gl.deleteTexture(this._texture)
                        this._texture = null
                    }
                    super.dispose()
                }
                set size(value) {
                    this._size = value
                    this._rotationCenter = [value[0] / 2, value[1] / 2]
                }
                get size() {
                    return this._size
                }
                getTexture(scale) {
                    return this._texture || super.getTexture()
                }
                setContent(textureData) {
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture)
                    this.gl.texImage2D(
                        this.gl.TEXTURE_2D,
                        0,
                        this.gl.RGBA,
                        this.gl.RGBA,
                        this.gl.UNSIGNED_BYTE,
                        textureData,
                    )
                    this.emit(Skin.Events.WasAltered)
                }
            }

            this.CanvasSkin = CanvasSkin
        }
    }
    //End of Skins, Please keep this comment if you wanna use this code :3

    const {
        ArgumentType,
        BlockType,
        TargetType,
        Cast,
        translate,
        extensions,
        runtime,
    } = Scratch;

    const chen_RenderTheWorld_extensionId = "RenderTheWorld";

    /** @typedef {string|number|boolean} SCarg 来自Scratch圆形框的参数，虽然这个框可能只能输入数字，但是可以放入变量，因此有可能获得数字、布尔和文本（极端情况下还有 null 或 undefined，需要同时处理 */
    /** 放在外面来装逼 */
    translate.setup({
        "zh-cn": {
            "RenderTheWorld.name": "渲染世界",
            "RenderTheWorld.fileListEmpty": "没有文件",
            "RenderTheWorld.apidocs": "📖API文档",
            "RenderTheWorld.objectLoadingCompleted": "当[name]对象加载完成时",
            "RenderTheWorld.set3dState": "设置3D显示器状态为: [state]",
            "RenderTheWorld.get3dState": "​3D显示器是显示的?",
            "RenderTheWorld.3dState.display": "显示",
            "RenderTheWorld.3dState.hidden": "隐藏",
            "RenderTheWorld.init":
                "初始化并设置背景颜色为[color] 大小[sizex]x[sizey]y [Anti_Aliasing]",
            "RenderTheWorld.Anti_Aliasing.enable": "启用抗锯齿",
            "RenderTheWorld.Anti_Aliasing.disable": "禁用抗锯齿",
            "RenderTheWorld.render": "渲染场景",
            "RenderTheWorld.color_": "颜色: [R] [G] [B]",
            "RenderTheWorld.tools": "🛠️工具",
            "RenderTheWorld.YN.true": "能",
            "RenderTheWorld.YN.false": "不能",
            "RenderTheWorld.YN2.yes": "有",
            "RenderTheWorld.YN2.no": "没有",
            "RenderTheWorld.isWebGLAvailable": "兼容性检查",
            "RenderTheWorld._isWebGLAvailable": "当前设备支持WebGL吗?",

            "RenderTheWorld.objects": "🧸物体",
            "RenderTheWorld.makeCube":
                "创建或重置长方体: [name] 长[a] 宽[b] 高[h] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影",
            "RenderTheWorld.makeSphere":
                "创建或重置球体: [name] 半径[radius] 水平分段数[w] 垂直分段数[h] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影",
            "RenderTheWorld.makePlane":
                "创建或重置平面: [name] 长[a] 宽[b] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影",
            "RenderTheWorld.importOBJ":
                "导入或重置OBJ模型: [name] OBJ模型文件: [objfile] MTL材质文件: [mtlfile] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影",
            "RenderTheWorld.importGLTF":
                "导入或重置GLTF模型: [name] GLTF模型文件: [gltffile] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影",

            "RenderTheWorld.playAnimation":
                "启动模型: [name] 的动画[animationName]",
            "RenderTheWorld.stopAnimation":
                "结束模型: [name] 的动画[animationName]",
            "RenderTheWorld.updateAnimation":
                "推进模型: [name] 的动画 [time]毫秒 并更新",
            "RenderTheWorld.getAnimation": "获取模型: [name] 的所有动画",

            "RenderTheWorld.rotationObject":
                "将物体: [name] 旋转: x[x] y[y] z[z]",
            "RenderTheWorld.moveObject":
                "将物体: [name] 移动到: x[x] y[y] z[z]",
            "RenderTheWorld.scaleObject": "将物体: [name] 缩放: x[x] y[y] z[z]",

            "RenderTheWorld.getObjectPos": "获取物体: [name] 的[xyz]坐标",
            "RenderTheWorld.getObjectRotation":
                "获取物体: [name] [xyz]的旋转角度",
            "RenderTheWorld.getObjectScale": "获取物体: [name] [xyz]的缩放",

            "RenderTheWorld.deleteObject": "删除物体: [name]",

            "RenderTheWorld.xyz.x": "x轴",
            "RenderTheWorld.xyz.y": "y轴",
            "RenderTheWorld.xyz.z": "z轴",

            "RenderTheWorld.lights": "🕯️光照",
            "RenderTheWorld.setAmbientLightColor":
                "设置环境光颜色: [color] 光照强度: [intensity]",
            "RenderTheWorld.setHemisphereLightColor":
                "设置半球光天空颜色: [skyColor] 地面颜色: [groundColor] 光照强度: [intensity]",
            "RenderTheWorld.makePointLight":
                "创建或重置点光源: [name] 颜色: [color] 光照强度: [intensity] 位置: x[x] y[y] z[z] 衰减量[decay] [YN]投射阴影",
            "RenderTheWorld.makeDirectionalLight":
                "创建或重置方向光: [name] 颜色: [color] 光照强度: [intensity] 位置: x[x] y[y] z[z] 指向: x[x2] y[y2] z[z2] [YN]投射阴影",
            "RenderTheWorld.setDirectionalLightShawdowCamera":
                "设置方向光: [name] 的阴影投射范围 left: [left] right: [right] top: [top] bottom: [bottom]",
            "RenderTheWorld.setLightMapSize":
                "设置光源: [name] 的阴影纹理分辨率为: x[xsize] y[ysize]",
            "RenderTheWorld.moveLight": "将光源: [name] 移动到: x[x] y[y] z[z]",
            "RenderTheWorld.getLightPos": "获取光源: [name] 的[xyz]坐标",
            "RenderTheWorld.deleteLight": "删除光源: [name]",

            "RenderTheWorld.camera": "📷相机",
            "RenderTheWorld.moveCamera": "将相机移动到x[x]y[y]z[z]",
            "RenderTheWorld.rotationCamera": "将相机旋转: x[x] y[y] z[z]",
            "RenderTheWorld.cameraLookAt": "让相机面向: x[x] y[y] z[z]",
            "RenderTheWorld.getCameraPos": "获取相机[xyz]坐标",
            "RenderTheWorld.getCameraRotation": "获取相机[xyz]的旋转角度",
            "RenderTheWorld.setControlState": "鼠标[YN]控制相机",
            "RenderTheWorld.mouseCanControlCamera": "鼠标能控制相机吗?",
            "RenderTheWorld.controlCamera":
                "鼠标控制相机: [yn1]右键拖拽 [yn2]中键缩放 [yn3]左键旋转",
            "RenderTheWorld.setControlCameraDamping":
                "鼠标控制相机: [YN2] 惯性",
            "RenderTheWorld.setControlCameraDampingNum":
                "设置鼠标控制相机的惯性系数[num]",

            "RenderTheWorld.fogs": "🌫️雾",
            "RenderTheWorld.enableFogEffect":
                "启用雾效果并设置雾颜色为: [color] near[near] far[far]",
            "RenderTheWorld.disableFogEffect": "禁用雾效果",
        },
        en: {
            "RenderTheWorld.name": "Render The World",
            "RenderTheWorld.fileListEmpty": "file list is empty",
            "RenderTheWorld.apidocs": "📖API Docs",
            "RenderTheWorld.objectLoadingCompleted":
                "When [name] object loading is completed",
            "RenderTheWorld.set3dState":
                "Set the 3D display status to: [state]",
            "RenderTheWorld.get3dState": "The 3D display is show?",
            "RenderTheWorld.3dState.display": "display",
            "RenderTheWorld.3dState.hidden": "hidden",
            "RenderTheWorld.init":
                "init and set the background color to [color] size:[sizex]x[sizey]y [Anti_Aliasing]",
            "RenderTheWorld.Anti_Aliasing.enable": "enable anti aliasing",
            "RenderTheWorld.Anti_Aliasing.disable": "disable anti aliasing",
            "RenderTheWorld.render": "render",
            "RenderTheWorld.color_": "color: [R] [G] [B]",
            "RenderTheWorld.tools": "🛠️Tools",
            "RenderTheWorld.YN.true": "can",
            "RenderTheWorld.YN.false": "can't",
            "RenderTheWorld.YN2.yes": "yes",
            "RenderTheWorld.YN2.no": "no",
            "RenderTheWorld.isWebGLAvailable": "compatibility check",
            "RenderTheWorld._isWebGLAvailable":
                "Does the current device support WebGL?",

            "RenderTheWorld.objects": "🧸Objects",
            "RenderTheWorld.makeCube":
                "reset or make a Cube: [name] length[a] width[b] height[h] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast",
            "RenderTheWorld.makeSphere":
                "reset or make a Sphere: [name] radius[radius] widthSegments[w] heightSegments[h] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast",
            "RenderTheWorld.makePlane":
                "reset or make a Plane: [name] length[a] width[b] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast",
            "RenderTheWorld.importOBJ":
                "reset or make a OBJ Model: [name] OBJ file: [objfile] MTL file: [mtlfile] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast",
            "RenderTheWorld.importGLTF":
                "reset or make a GLTF Model: [name] GLTF file: [gltffile] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast",

            "RenderTheWorld.playAnimation":
                "start Object: [name]'s Animation [animationName]",
            "RenderTheWorld.stopAnimation":
                "stop Object: [name]'s Animation [animationName]",
            "RenderTheWorld.updateAnimation":
                "advance Object: [name]'s animation [time] millisecond and update it",
            "RenderTheWorld.getAnimation":
                "Get Object: [name]'s all animations",

            "RenderTheWorld.rotationObject":
                "Object: [name] rotation: x[x] y[y] z[z]",
            "RenderTheWorld.moveObject": "Object: [name] go to: x[x] y[y] z[z]",
            "RenderTheWorld.scaleObject":
                "Object: [name] scale: x[x] y[y] z[z]",

            "RenderTheWorld.getObjectPos": "get Object: [name]'s [xyz] pos",
            "RenderTheWorld.getObjectRotation":
                "get Object: [name]'s  [xyz] rotation",
            "RenderTheWorld.getObjectScale":
                "get Object: [name]'s  [xyz] scale",

            "RenderTheWorld.deleteObject": "delete object: [name]",

            "RenderTheWorld.xyz.x": "x-axis",
            "RenderTheWorld.xyz.y": "y-axis",
            "RenderTheWorld.xyz.z": "z-axis",

            "RenderTheWorld.lights": "🕯️Lights",
            "RenderTheWorld.setAmbientLightColor":
                "set AmbientLight's color: [color] intensity: [intensity]",
            "RenderTheWorld.setHemisphereLightColor":
                "set HemisphereLight's skyColor: [skyColor] groundColor: [groundColor] intensity: [intensity]",
            "RenderTheWorld.makePointLight":
                "reset or make a PointLight: [name] color: [color] intensity: [intensity] position: x[x] y[y] z[z] decay[decay] [YN]cast shadows",
            "RenderTheWorld.makeDirectionalLight":
                "reset or make a DirectionalLight: [name] color: [color] intensity: [intensity] position: x[x] y[y] z[z] to: x[x2] y[y2] z[z2] [YN]cast shadows",
            "RenderTheWorld.setDirectionalLightShawdowCamera":
                "set the shadow casting range for DirectionalLight: [name] left: [left] right: [right] top: [top] bottom: [bottom]",
            "RenderTheWorld.setLightMapSize":
                "set Light: [name]'s shadow texture resolution x[xsize] y[ysize]",
            "RenderTheWorld.moveLight": "Light: [name] go to: x[x] y[y] z[z]",
            "RenderTheWorld.getLightPos": "get Light: [name]'s [xyz] pos",
            "RenderTheWorld.deleteLight": "delete light: [name]",

            "RenderTheWorld.camera": "📷Camera",
            "RenderTheWorld.moveCamera": "camera go to: x[x]y[y]z[z]",
            "RenderTheWorld.rotationCamera": "camera rotation: x[x]y[y]z[z]",
            "RenderTheWorld.cameraLookAt":
                "Face the camera towards: x[x] y[y] z[z]",
            "RenderTheWorld.getCameraPos": "get camera's [xyz] pos",
            "RenderTheWorld.getCameraRotation": "get camera's  [xyz] rotation",
            "RenderTheWorld.setControlState": "Mouse [YN] control camera",
            "RenderTheWorld.mouseCanControlCamera": "Mouse can control camera?",
            "RenderTheWorld.controlCamera":
                "Mouse control camera: [yn1]right click drag [yn2] middle click zoom and [yn3] left click rotation",
            "RenderTheWorld.setControlCameraDamping":
                "Mouse control camera: [YN2] Damping",
            "RenderTheWorld.setControlCameraDampingNum":
                "set the damping coefficient of mouse controlled camera [num]",

            "RenderTheWorld.fogs": "🌫️Fog",
            "RenderTheWorld.enableFogEffect":
                "Enable fog effect and set fog color to: [color] near[near] far[far]",
            "RenderTheWorld.disableFogEffect": "Disable fog effect",
        },
    });

    class RenderTheWorld {
        constructor(_runtime) {
            this.runtime = _runtime ?? Scratch?.vm?.runtime;
            if (!this.runtime) return;

            hackFun(_runtime);

            // 注册可拓展积木
            setExpandableBlocks(
                this.runtime,
                this
            );
            this.is_listener = false;
            this._init_porject_time = 0;

            // 兼容性
            this.isWebglAvailable = false;

            // 渲染器
            this.renderer = null;
            // 场景
            this.scene = null;

            // 相机配置
            this.fov = null;
            this.aspect = null;
            this.near = null;
            this.far = null;
            this.camera = null;
            this.controls = null;

            // 环境光
            this.ambient_light = null;
            // 半球光
            this.hemisphere_light = null;

            // 光
            this.lights = {};
            // 物体
            this.objects = {};
            // 动画
            this.animations = {};

            // 原CCW显示canvas
            //this._ccw = document.getElementsByClassName('gandi_stage_stage_1fD7k')[0].getElementsByTagName('canvas')[0];
            this.scratchCanvas = null;

            // threejs显示canvas
            this.tc = null;
            this.isTcShow = false;
            this.NullCanvas = document.createElement("canvas");

            // threejs skin
            let index = this.runtime.renderer._groupOrdering.indexOf("video");
            this.runtime.renderer._groupOrdering.splice(index + 1, 0, "RenderTheWorld");
            this.runtime.renderer._layerGroups["RenderTheWorld"] = {
                groupIndex: 0,
                drawListOffset: this.runtime.renderer._layerGroups["video"].drawListOffset,
            };
            for (let i = 0; i < this.runtime.renderer._groupOrdering.length; i++) {
                this.runtime.renderer._layerGroups[this.runtime.renderer._groupOrdering[i]].groupIndex = i;
            }

            // Create drawable and skin
            this.threeSkinId = this.runtime.renderer._nextSkinId++
            let SkinsClass = new Skins(this.runtime);
            this.threeSkin = new SkinsClass.CanvasSkin(this.threeSkinId, this.runtime.renderer)
            this.runtime.renderer._allSkins[this.threeSkinId] = this.threeSkin

            // threejs drawable layer
            this.threeDrawableId = this.runtime.renderer.createDrawable("RenderTheWorld")
            this.runtime.renderer.updateDrawableSkinId(
                this.threeDrawableId,
                this.threeSkinId,
            );

            console.log(this.runtime.renderer);

            this.clock = null;
            this._clock = 0;
        }

        /**
         * 翻译
         * @param {string} id
         * @return {string}
         */
        formatMessage(id) {
            return translate({
                id,
                default: id,
                description: id,
            });
        }

        getInfo() {
            return {
                id: chen_RenderTheWorld_extensionId, // 拓展id
                docsURI:
                    "https://learn.ccw.site/article/aa0cf6d0-6758-447a-96f5-8e5dfdbe14d6",
                name: this.formatMessage("RenderTheWorld.name"), // 拓展名
                blockIconURI: chen_RenderTheWorld_icon,
                menuIconURI: chen_RenderTheWorld_icon,
                color1: "#121C3D",
                color2: "#4A76FF",
                color3: "#4A76FF",
                blocks: [
                    {
                        blockType: BlockType.BUTTON,
                        text: this.formatMessage("RenderTheWorld.apidocs"),
                        onClick: this.docs,
                    },
                    {
                        opcode: "init",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.init"),
                        arguments: {
                            color: {
                                type: "number",
                                defaultValue: 0,
                            },
                            sizex: {
                                type: "number",
                                defaultValue: 640,
                            },
                            sizey: {
                                type: "number",
                                defaultValue: 360,
                            },
                            Anti_Aliasing: {
                                type: "string",
                                menu: "Anti_Aliasing",
                            },
                        },
                    },
                    {
                        opcode: "set3dState",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.set3dState"),
                        arguments: {
                            state: {
                                type: "string",
                                menu: "3dState",
                            },
                        },
                    },
                    {
                        opcode: "get3dState",
                        blockType: BlockType.BOOLEAN,
                        text: this.formatMessage("RenderTheWorld.get3dState"),
                    },
                    // {
                    //     opcode: "render",
                    //     blockType: BlockType.COMMAND,
                    //     text: this.formatMessage("RenderTheWorld.render"),
                    // },
                    {
                        blockType: BlockType.LABEL,
                        text: this.formatMessage("RenderTheWorld.tools"),
                    },
                    {
                        opcode: "color_",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage("RenderTheWorld.color_"),
                        arguments: {
                            R: {
                                type: "number",
                                defaultValue: 255,
                            },
                            G: {
                                type: "number",
                                defaultValue: 255,
                            },
                            B: {
                                type: "number",
                                defaultValue: 255,
                            },
                        },
                    },
                    {
                        opcode: "isWebGLAvailable",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.isWebGLAvailable",
                        ),
                    },
                    {
                        opcode: "_isWebGLAvailable",
                        blockType: BlockType.BOOLEAN,
                        text: this.formatMessage(
                            "RenderTheWorld._isWebGLAvailable",
                        ),
                    },
                    {
                        blockType: BlockType.LABEL,
                        text: this.formatMessage("RenderTheWorld.objects"),
                    },
                    {
                        opcode: "makeCube",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.makeCube"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            a: {
                                type: "number",
                                defaultValue: 5,
                            },
                            b: {
                                type: "number",
                                defaultValue: 5,
                            },
                            h: {
                                type: "number",
                                defaultValue: 5,
                            },
                            color: {
                                type: "number",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                            YN2: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "makeSphere",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.makeSphere"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            radius: {
                                type: "number",
                                defaultValue: 3,
                            },
                            w: {
                                type: "number",
                                defaultValue: 32,
                            },
                            h: {
                                type: "number",
                                defaultValue: 16,
                            },
                            color: {
                                type: "number",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                            YN2: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "makePlane",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.makePlane"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            a: {
                                type: "number",
                                defaultValue: 5,
                            },
                            b: {
                                type: "number",
                                defaultValue: 5,
                            },
                            color: {
                                type: "number",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                            YN2: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "importOBJ",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.importOBJ"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            objfile: {
                                type: "string",
                                menu: "file_list",
                            },
                            mtlfile: {
                                type: "string",
                                menu: "file_list",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                            YN2: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "importGLTF",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.importGLTF"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            gltffile: {
                                type: "string",
                                menu: "file_list",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                                defaultValue: "false",
                            },
                            YN2: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "deleteObject",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.deleteObject"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                        },
                        expandableBlock: {
                            expandableArgs: {
                                'TEXT': ['text', ', ', 1],
                                'NAME': ['string', 'name'],
                            },
                            defaultIndex: 1,
                            textBegin: '',
                            textEnd: ''
                        }
                    },
                    {
                        opcode: "rotationObject",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.rotationObject",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "moveObject",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.moveObject"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "scaleObject",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.scaleObject"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "getObjectPos",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage("RenderTheWorld.getObjectPos"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                    },
                    {
                        opcode: "getObjectRotation",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage(
                            "RenderTheWorld.getObjectRotation",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                    },
                    {
                        opcode: "getObjectScale",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage(
                            "RenderTheWorld.getObjectScale",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "playAnimation",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.playAnimation",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            animationName: {
                                type: "string",
                                defaultValue: "animationName",
                            },
                        },
                        expandableBlock: {
                            expandableArgs: {
                                'TEXT': ['text', ', ', 1],
                                'ANIMATIONMAME': ['string', 'animationName'],
                            },
                            defaultIndex: 1,
                            textBegin: '',
                            textEnd: ''
                        }
                    },
                    {
                        opcode: "stopAnimation",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.stopAnimation",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            animationName: {
                                type: "string",
                                defaultValue: "animationName",
                            },
                        },
                        expandableBlock: {
                            expandableArgs: {
                                'TEXT': ['text', ', ', 1],
                                'ANIMATIONMAME': ['string', 'animationName'],
                            },
                            defaultIndex: 1,
                            textBegin: '',
                            textEnd: ''
                        }
                    },
                    {
                        opcode: "updateAnimation",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.updateAnimation",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            time: {
                                type: "number",
                                defaultValue: "1",
                            },
                        },
                    },
                    {
                        opcode: "getAnimation",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage("RenderTheWorld.getAnimation"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                        },
                        disableMonitor: true,
                    },
                    "---",
                    {
                        opcode: "objectLoadingCompleted",
                        blockType: BlockType.HAT,
                        text: this.formatMessage(
                            "RenderTheWorld.objectLoadingCompleted",
                        ),
                        isEdgeActivated: false,
                        shouldRestartExistingThreads: false,
                        arguments: {
                            name: {
                                type: "ccw_hat_parameter",
                                defaultValue: "name",
                            },
                        },
                    },
                    {
                        blockType: BlockType.LABEL,
                        text: this.formatMessage("RenderTheWorld.lights"),
                    },
                    {
                        opcode: "makePointLight",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.makePointLight",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            color: {
                                type: "number",
                            },
                            intensity: {
                                type: "number",
                                defaultValue: 100,
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            decay: {
                                type: "number",
                                defaultValue: 2,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "makeDirectionalLight",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.makeDirectionalLight",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            color: {
                                type: "number",
                            },
                            intensity: {
                                type: "number",
                                defaultValue: 100,
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 1,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                            x2: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y2: {
                                type: "number",
                                defaultValue: 1,
                            },
                            z2: {
                                type: "number",
                                defaultValue: 0,
                            },
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "setAmbientLightColor",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setAmbientLightColor",
                        ),
                        arguments: {
                            color: {
                                type: "number",
                            },
                            intensity: {
                                type: "number",
                                defaultValue: 1,
                            },
                        },
                    },
                    {
                        opcode: "setHemisphereLightColor",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setHemisphereLightColor",
                        ),
                        arguments: {
                            skyColor: {
                                type: "number",
                            },
                            groundColor: {
                                type: "number",
                            },
                            intensity: {
                                type: "number",
                                defaultValue: 1,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "setDirectionalLightShawdowCamera",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setDirectionalLightShawdowCamera",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            left: {
                                type: "number",
                                defaultValue: -20,
                            },
                            right: {
                                type: "number",
                                defaultValue: 20,
                            },
                            top: {
                                type: "number",
                                defaultValue: 20,
                            },
                            bottom: {
                                type: "number",
                                defaultValue: -20,
                            },
                        },
                    },
                    {
                        opcode: "setLightMapSize",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setLightMapSize",
                        ),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            xsize: {
                                type: "number",
                                defaultValue: 512,
                            },
                            ysize: {
                                type: "number",
                                defaultValue: 512,
                            },
                        },
                    },
                    {
                        opcode: "moveLight",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.moveLight"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "getLightPos",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage("RenderTheWorld.getLightPos"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "deleteLight",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.deleteLight"),
                        arguments: {
                            name: {
                                type: "string",
                                defaultValue: "name",
                            },
                        },
                        expandableBlock: {
                            expandableArgs: {
                                'TEXT': ['text', ', ', 1],
                                'NAME': ['string', 'name'],
                            },
                            defaultIndex: 1,
                            textBegin: '',
                            textEnd: ''
                        }
                    },
                    {
                        blockType: BlockType.LABEL,
                        text: this.formatMessage("RenderTheWorld.camera"),
                    },
                    {
                        opcode: "moveCamera",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.moveCamera"),
                        arguments: {
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "rotationCamera",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.rotationCamera",
                        ),
                        arguments: {
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    {
                        opcode: "cameraLookAt",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage("RenderTheWorld.cameraLookAt"),
                        arguments: {
                            x: {
                                type: "number",
                                defaultValue: 0,
                            },
                            y: {
                                type: "number",
                                defaultValue: 0,
                            },
                            z: {
                                type: "number",
                                defaultValue: 0,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "getCameraPos",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage("RenderTheWorld.getCameraPos"),
                        arguments: {
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                        disableMonitor: true,
                    },
                    {
                        opcode: "getCameraRotation",
                        blockType: BlockType.REPORTER,
                        text: this.formatMessage(
                            "RenderTheWorld.getCameraRotation",
                        ),
                        arguments: {
                            xyz: {
                                type: "string",
                                menu: "xyz",
                            },
                        },
                        disableMonitor: true,
                    },
                    "---",
                    {
                        opcode: "setControlState",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setControlState",
                        ),
                        hideFromPalette: false,
                        arguments: {
                            YN: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "mouseCanControlCamera",
                        blockType: BlockType.BOOLEAN,
                        text: this.formatMessage(
                            "RenderTheWorld.mouseCanControlCamera",
                        ),
                    },
                    {
                        opcode: "controlCamera",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.controlCamera",
                        ),
                        hideFromPalette: false,
                        arguments: {
                            yn1: {
                                type: "string",
                                menu: "YN",
                            },
                            yn2: {
                                type: "string",
                                menu: "YN",
                            },
                            yn3: {
                                type: "string",
                                menu: "YN",
                            },
                        },
                    },
                    {
                        opcode: "setControlCameraDamping",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setControlCameraDamping",
                        ),
                        arguments: {
                            YN2: {
                                type: "string",
                                menu: "YN2",
                            },
                        },
                    },
                    {
                        opcode: "setControlCameraDampingNum",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.setControlCameraDampingNum",
                        ),
                        arguments: {
                            num: {
                                type: "number",
                                defaultValue: 0.05,
                            },
                        },
                    },
                    {
                        blockType: BlockType.LABEL,
                        text: this.formatMessage("RenderTheWorld.fogs"),
                    },
                    {
                        opcode: "enableFogEffect",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.enableFogEffect",
                        ),
                        arguments: {
                            color: {
                                type: "number",
                            },
                            near: {
                                type: "number",
                                defaultValue: 1,
                            },
                            far: {
                                type: "number",
                                defaultValue: 1000,
                            },
                        },
                    },
                    {
                        opcode: "disableFogEffect",
                        blockType: BlockType.COMMAND,
                        text: this.formatMessage(
                            "RenderTheWorld.disableFogEffect",
                        ),
                    },
                ],

                menus: {
                    file_list: {
                        acceptReporters: true,
                        items: "__gandiAssetsJsonFileList",
                    },
                    xyz: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.xyz.x",
                                ),
                                value: "x",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.xyz.y",
                                ),
                                value: "y",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.xyz.z",
                                ),
                                value: "z",
                            },
                        ],
                    },
                    Anti_Aliasing: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.Anti_Aliasing.enable",
                                ),
                                value: "enable",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.Anti_Aliasing.disable",
                                ),
                                value: "disable",
                            },
                        ],
                    },
                    YN: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.YN.true",
                                ),
                                value: "true",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.YN.false",
                                ),
                                value: "false",
                            },
                        ],
                    },
                    YN2: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.YN2.yes",
                                ),
                                value: "yes",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.YN2.no",
                                ),
                                value: "no",
                            },
                        ],
                    },
                    "3dState": {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.3dState.display",
                                ),
                                value: "display",
                            },
                            {
                                text: this.formatMessage(
                                    "RenderTheWorld.3dState.hidden",
                                ),
                                value: "hidden",
                            },
                        ],
                    },
                },
            };
        }
        __gandiAssetsJsonFileList() {
            try {
                const list = this.runtime
                    .getGandiAssetsFileList("json")
                    .map((item) => ({
                        text: item.fullName,
                        value: item.fullName,
                    }));
                if (list.length < 1) {
                    return [
                        {
                            text: this.formatMessage(
                                "RenderTheWorld.fileListEmpty",
                            ),
                            value: "fileListEmpty",
                        },
                    ];
                }

                return list;
            } catch (err) {
                return [
                    {
                        text: this.formatMessage(
                            "RenderTheWorld.fileListEmpty",
                        ),
                        value: "fileListEmpty",
                    },
                ];
            }
        }

        /**
         * @param {string} filename
         */
        getFileURL(filename) {
            return this.runtime.getGandiAssetContent(filename).encodeDataURI();
        }

        docs() {
            let a = document.createElement("a");
            a.href =
                "https://learn.ccw.site/article/aa0cf6d0-6758-447a-96f5-8e5dfdbe14d6";
            a.rel = "noopener noreferrer";
            a.target = "_blank";
            a.click();
        }

        /**
         * 兼容性检查
         * @param {object} args
         */

        isWebGLAvailable({ }) {
            this.isWebglAvailable = WebGL.isWebGLAvailable();
        }
        /**
         * 兼容性
         * @param {object} args
         * @return {boolean}
         */

        _isWebGLAvailable({ }) {
            return this.isWebglAvailable;
        }

        objectLoadingCompleted({ name }) {
            if (Cast.toString(name) in this.objects) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * @param {object} model
         */
        _deleteObject(model) {
            if (model.type === "Mesh") {
                model.geometry.dispose();
                model.material.dispose();
            } else if (model.type === "Group") {
                model.traverse((obj) => {
                    if (obj.type === "Mesh") {
                        obj.geometry.dispose();
                        if (Array.isArray(obj.material)) {
                            obj.material.forEach((mat) => {
                                mat.dispose();
                            });
                        } else {
                            obj.material.dispose();
                        }
                    }
                });
            }

            this.scene.remove(model);
        }

        /**
         * @param {string} name
         */
        releaseDuplicates(name) {
            if (name in this.objects) {
                if (name in this.animations) {
                    if (this.animations[name].mixer) {
                        this.animations[name].mixer.stopAllAction();
                    }
                    this.animations[name] = {};
                }
                this._deleteObject(this.objects[name]);
            }
        }

        /**
         * 初始化
         * @param {object} args
         * @param {number} args.color
         * @param {number} args.sizey
         * @param {number} args.sizex
         * @param {string} args.Anti_Aliasing
         */
        init({ color, sizex, sizey, Anti_Aliasing }) {
            this._init_porject_time = new Date().getTime();
            const _draw = this.runtime.renderer.draw;
            // 将原来的大小自适应删掉就能解决黑屏
            // const _resize = this.runtime.renderer.resize;
            // this.runtime.renderer.resize = (pixelsWide, pixelsTall) => {
            //     _resize.call(this.runtime.renderer, pixelsWide, pixelsTall);
            //     if (this.tc) {
            //         this.tc.width = String(pixelsWide) + "px";
            //         this.tc.height = String(pixelsTall) + "px";
            //     }
            // };
            // this.runtime.renderer.draw = () => {
            //     if (!this.isTdShow) {
            //         _draw.call(this.runtime.renderer);
            //     } else if (this.dirty) {
            //         this.dirty = false; // TODO: 和 Scratch renderer 共用 dirty
            //         // this.dirty 是一个变量，每当场景变更（需要渲染）时就设置为 true
            //         this.renderer.render(this.scene, this.camera);
            //     }
            // };
            this.dirty = false;

            this.scratchCanvas = this.runtime.renderer.canvas;

            this.clock = new THREE.Clock();
            this._clock = 0;
            this.objects = {};
            this.lights = {};
            this.animations = {};
            // this._ccw.style.display = 'none';  // 隐藏原CCW显示canvas

            // 创建threejs显示canvas
            //this._ccw = document.getElementsByClassName('gandi_stage_stage_1fD7k')[0].getElementsByTagName('canvas')[0];
            if (!this.tc) {
                this.tc = document.createElement("canvas");
                this.tc.className = "RenderTheWorld";
            }

            this.scratchCanvas = this.runtime.renderer.canvas;

            // this.runtime.renderer.resize = (e, t) => {
            // 	this.__resize.call(this.runtime.renderer, e, t);
            // 	this._resize();
            // };
            // this.runtime.renderer.draw = () => {
            // 	if (!this.isTdShow) {
            // 		this.__draw.call(this.runtime.renderer);
            // 	}
            // };

            let _antialias = false;
            // 是否启动抗锯齿

            if (Cast.toString(Anti_Aliasing) == "enable") {
                _antialias = true;
            }
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.tc,
                antialias: _antialias,
            }); // 创建渲染器
            this.renderer.setClearColor("#000000"); // 设置渲染器背景

            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMapEnabled = true;
            //this.renderer.setSize(this.tc.clientWidth, this.tc.clientHeight, false);
            this.renderer.setSize(
                Cast.toNumber(sizex),

                Cast.toNumber(sizey),
            );
            this.tc.size = [sizex, sizey]
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;

            this.scene = new THREE.Scene(); // 创建场景

            this.scene.background = new THREE.Color(Cast.toNumber(color)); // 设置背景颜色

            // 创建摄像机
            this.fov = 40; // 视野范围
            // this.aspect = this.runtime.stageWidth / this.runtime.stageHeight; // 相机默认值 画布的宽高比
            this.aspect = this.tc.width / this.tc.height; // 相机默认值 画布的宽高比
            this.near = 0.1; // 近平面
            this.far = 1000; // 远平面
            // 透视投影相机
            this.camera = new THREE.PerspectiveCamera(
                this.fov,
                this.aspect,
                this.near,
                this.far,
            );
            this.controls = new OrbitControls(
                this.camera,
                this.scratchCanvas,
            );
            this.controls.enabled = false;
            this.controls.enableDamping = false;
            this.controls.enablePan = false; //禁止右键拖拽
            this.controls.enableZoom = false; //禁止缩放
            this.controls.enableRotate = false; //禁止旋转
            // this.controls.addEventListener('change', function () {
            //     this.renderer.render(this.scene, this.camera);
            // });
            this.controls.update();

            // 创建环境光
            this.ambient_light = new THREE.AmbientLight(0x000000);
            this.scene.add(this.ambient_light);

            // 创建半球光
            this.hemisphere_light = new THREE.HemisphereLight(
                0x000000,
                0x000000,
            );
            this.scene.add(this.hemisphere_light);

            this.isTcShow = true;

            this.render = () => {
                this._clock = this.clock.getDelta();
                this.renderer.render(this.scene, this.camera);
                // this.threeSkin.setContent(this.tc)
                if (this.isTcShow) {
                    this.threeSkin.setContent(this.tc);
                } else {
                    this.threeSkin.setContent(this.NullCanvas);
                }
                this.runtime.requestRedraw()

                if (this.controls.enabled) {
                    this.controls.update();
                }
            };

            this._listener();
        }

        _listener() {
            if (!this.is_listener) {
                this.runtime.on("PROJECT_START", () => {
                    //console.log(chen_RenderTheWorld_extensionId + ": Starting renders");
                    this.renderer.setAnimationLoop(this.render);
                });

                this.runtime.on("PROJECT_STOP_ALL", () => {
                    this._init_porject_time = 0;
                    console.log(chen_RenderTheWorld_extensionId + ": Stopping renders");
                    this.renderer.setAnimationLoop(null);
                    this.scene.traverse((child) => {
                        if (child.material) {
                            child.material.dispose();
                        }
                        if (child.geometry) {
                            child.geometry.dispose();
                        }
                        child = null;
                    });
                    this.renderer.dispose();
                    this.scene.clear();
                });
                this.is_listener = true;
            }
        }

        /**
         * 设置3d渲染器状态
         * @param {object} args
         * @param {string} args.state
         */

        set3dState({ state }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            if (Cast.toString(state) === "display") {
                this.isTcShow = true;
            } else {
                this.isTcShow = false;
            }
        }

        get3dState(args) {
            return this.isTcShow;
        }

        // _resize() {
        // 	this.tc.style.width = this.scratchCanvas.style.width;
        // 	this.tc.style.height = this.scratchCanvas.style.height;
        // }

        /**
         * 渲染，放在主循环里
         */

        // render(args) {
        //     if (!this.tc) {
        //         return "⚠️显示器未初始化！";
        //     }
        //     this._clock = this.clock.getDelta();
        //     this.renderer.render(this.scene, this.camera);

        //     if (this.controls.enabled) {
        //         this.controls.update();
        //     }
        // }

        /**
         * 创建或重置长方体
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.a
         * @param {number} args.b
         * @param {number} args.h
         * @param {number} args.color
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {string} args.YN
         * @param {string} args.YN2
         */

        makeCube({ name, a, b, h, color, x, y, z, YN, YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            let init_porject_time = this._init_porject_time;  // 解决快速点击多次绿旗，模型重复添加问题
            // 名称

            name = Cast.toString(name);
            // 长方体
            let geometry = new THREE.BoxGeometry(
                Cast.toNumber(a),

                Cast.toNumber(b),

                Cast.toNumber(h),
            );
            // let material = new THREE.MeshPhongMaterial({
            //     color: Cast.toNumber(args.color),
            // });
            // 纹理
            let material = new THREE.MeshLambertMaterial({
                color: Cast.toNumber(color),
            });
            material.fog = true;

            // 添加到场景
            this.releaseDuplicates(name);

            this.objects[name] = new THREE.Mesh(geometry, material);
            this.objects[name].position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            );


            if (Cast.toString(YN) == "true") {
                this.objects[name].castShadow
                this.objects[name].castShadow = true;
            }

            if (Cast.toString(YN2) == "true") {
                this.objects[name].receiveShadow = true;
            }
            let r = this.runtime.startHatsWithParams(
                chen_RenderTheWorld_extensionId + "_objectLoadingCompleted",
                {
                    parameters: {
                        name: name,
                    },
                },
            );
            r && r.forEach(((e) => {
                this.runtime.sequencer.stepThread(e);
            }));
            if (init_porject_time == this._init_porject_time) {
                this.scene.add(this.objects[name]);
                this.render()
            }
        }

        /**
         * 创建或重置球体
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.radius
         * @param {number} args.w
         * @param {number} args.h
         * @param {number} args.color
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {string} args.YN
         * @param {string} args.YN2
         */

        makeSphere({ name, radius, w, h, color, x, y, z, YN, YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            let init_porject_time = this._init_porject_time;
            // 名称

            name = Cast.toString(name);
            // 长方体
            let geometry = new THREE.SphereGeometry(
                Cast.toNumber(radius),

                Cast.toNumber(w),

                Cast.toNumber(h),
            );
            // let material = new THREE.MeshPhongMaterial({
            //     color: Cast.toNumber(args.color),
            // });
            // 纹理
            let material = new THREE.MeshLambertMaterial({
                color: Cast.toNumber(color),
            });
            material.fog = true;

            // 添加到场景
            this.releaseDuplicates(name);

            this.objects[name] = new THREE.Mesh(geometry, material);
            this.objects[name].position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            );

            if (Cast.toString(YN) == "true") {
                this.objects[name].castShadow = true;
            }

            if (Cast.toString(YN2) == "true") {
                this.objects[name].receiveShadow = true;
            }
            let r = this.runtime.startHatsWithParams(
                chen_RenderTheWorld_extensionId + "_objectLoadingCompleted",
                {
                    parameters: {
                        name: name,
                    },
                },
            );
            r && r.forEach(((e) => {
                this.runtime.sequencer.stepThread(e);
            }));
            if (init_porject_time == this._init_porject_time) {
                this.scene.add(this.objects[name]);
                this.render()
            }
        }

        /**
         * 创建或重置平面
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.a
         * @param {number} args.b
         * @param {number} args.color
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {string} args.YN
         * @param {string} args.YN2
         */

        makePlane({ name, a, b, color, x, y, z, YN, YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            let init_porject_time = this._init_porject_time;
            // 名称

            name = Cast.toString(name);
            // 长方体
            let geometry = new THREE.PlaneGeometry(
                Cast.toNumber(a),

                Cast.toNumber(b),
            );
            // let material = new THREE.MeshPhongMaterial({
            //     color: Cast.toNumber(args.color),
            // });
            // 纹理
            let material = new THREE.MeshLambertMaterial({
                color: Cast.toNumber(color),
            });
            material.fog = true;

            // 添加到场景
            this.releaseDuplicates(name);

            this.objects[name] = new THREE.Mesh(geometry, material);
            this.objects[name].position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            );

            if (Cast.toString(YN) == "true") {
                this.objects[name].castShadow = true;
            }

            if (Cast.toString(YN2) == "true") {
                this.objects[name].receiveShadow = true;
            }
            let r = this.runtime.startHatsWithParams(
                chen_RenderTheWorld_extensionId + "_objectLoadingCompleted",
                {
                    parameters: {
                        name: name,
                    },
                },
            );
            r && r.forEach(((e) => {
                this.runtime.sequencer.stepThread(e);
            }));
            if (init_porject_time == this._init_porject_time) {
                this.scene.add(this.objects[name]);
                this.render()
            }
        }

        /**
         * 导入或重置OBJ模型
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.objfile
         * @param {string} args.mtlfile
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {string} args.YN
         * @param {string} args.YN2
         */

        importOBJ({ name, objfile, mtlfile, x, y, z, YN, YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            if (objfile == "fileListEmpty") {
                return;
            }

            let _filelist = this.runtime.getGandiAssetsFileList().map((f) => f.fullName);
            if (_filelist.indexOf(objfile) == -1) {
                return "⚠️OBJ文件不存在！";
            }
            if (_filelist.indexOf(mtlfile) == -1) {
                return "⚠️MTL文件不存在！";
            }
            let init_porject_time = this._init_porject_time;
            // 名称

            name = Cast.toString(name);
            // 创建加载器
            const objLoader = new OBJLoader();
            const mtlLoader = new MTLLoader();
            // 添加到场景
            this.releaseDuplicates(name);
            // 加载模型

            mtlLoader.load(this.getFileURL(Cast.toString(mtlfile)), (mtl) => {
                mtl.preload();
                objLoader.setMaterials(mtl);

                objLoader.load(
                    this.getFileURL(Cast.toString(objfile)),
                    (root) => {
                        this.objects[name] = root;
                        // this.objects[name].position.set(Cast.toNumber(args.x), Cast.toNumber(args.y), Cast.toNumber(args.z));

                        this.objects[name].position.x = Cast.toNumber(x);

                        this.objects[name].position.y = Cast.toNumber(y);

                        this.objects[name].position.z = Cast.toNumber(z);

                        if (Cast.toString(YN) == "true") {
                            this.objects[name].castShadow = true;
                            this.objects[name].traverse(function (node) {
                                if (node.isMesh) {
                                    node.castShadow = true;
                                }
                            });
                        }

                        if (Cast.toString(YN2) == "true") {
                            this.objects[name].receiveShadow = true;
                            this.objects[name].traverse(function (node) {
                                if (node.isMesh) {
                                    node.receiveShadow = true;
                                }
                            });
                        }
                        let r = this.runtime.startHatsWithParams(
                            chen_RenderTheWorld_extensionId +
                            "_objectLoadingCompleted",
                            {
                                parameters: {
                                    name: name,
                                },
                            },
                        );
                        r && r.forEach(((e) => {
                            this.runtime.sequencer.stepThread(e);
                        }));
                        if (init_porject_time == this._init_porject_time) {
                            this.scene.add(this.objects[name]);
                            this.render()
                        }
                    },
                );
            });
        }

        /**
         * 导入或重置GLTF模型
         * @param {object} args
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.gltffile
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {string} args.YN
         * @param {string} args.YN2
         */

        importGLTF({ name, gltffile, x, y, z, YN, YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            if (gltffile == "fileListEmpty") {
                return;
            }

            let _filelist = this.runtime.getGandiAssetsFileList().map((f) => f.fullName);
            if (_filelist.indexOf(gltffile) == -1) {
                return "⚠️GLTF文件不存在！";
            }
            let init_porject_time = this._init_porject_time;
            // 名称

            name = Cast.toString(name);
            // 创建加载器
            const gltfLoader = new GLTFLoader();

            const url = this.getFileURL(Cast.toString(gltffile));
            // 添加到场景
            this.releaseDuplicates(name);
            // 加载模型
            gltfLoader.load(url, (gltf) => {
                const root = gltf.scene;

                // 保存动画数据
                let mixer = new THREE.AnimationMixer(root);
                let clips = gltf.animations;
                this.animations[name] = {
                    mixer: mixer,
                    clips: clips,
                    action: {},
                };

                this.objects[name] = root;

                this.objects[name].position.x = Cast.toNumber(x);

                this.objects[name].position.y = Cast.toNumber(y);

                this.objects[name].position.z = Cast.toNumber(z);

                if (Cast.toString(YN) == "true") {
                    this.objects[name].castShadow = true;
                    this.objects[name].traverse(function (node) {
                        if (node.isMesh) {
                            node.castShadow = true;
                        }
                    });
                }

                if (Cast.toString(YN2) == "true") {
                    this.objects[name].receiveShadow = true;
                    this.objects[name].traverse(function (node) {
                        if (node.isMesh) {
                            node.receiveShadow = true;
                        }
                    });
                }
                let r = this.runtime.startHatsWithParams(
                    chen_RenderTheWorld_extensionId + "_objectLoadingCompleted",
                    {
                        parameters: {
                            name: name,
                        },
                    },
                );
                r && r.forEach(((e) => {
                    this.runtime.sequencer.stepThread(e);
                }));
                if (init_porject_time == this._init_porject_time) {
                    this.scene.add(this.objects[name]);
                    this.render()
                }
            });
        }

        /**
         * 启动动画
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.animationName
         */

        playAnimation(args) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            let name = Cast.toString(args.name);

            let animationNames = [Cast.toString(args.animationName)];
            let i = 1;
            while (args[`ANIMATIONMAME_${i}`]) {
                animationNames.push(args[`ANIMATIONMAME_${i}`])
                i++;
            }

            if (name in this.animations && this.animations[name].mixer) {
                animationNames.forEach((animationName) => {
                    const cilp = THREE.AnimationClip.findByName(
                        this.animations[name].clips,
                        animationName,
                    );
                    if (cilp) {
                        this.animations[name].action[animationName] = this.animations[name].mixer.clipAction(cilp);
                        this.animations[name].action[animationName].play();
                    }
                })
            }
        }

        /**
         * 停止动画
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.animationName
         */

        stopAnimation(args) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            let name = Cast.toString(args.name);

            let animationNames = [Cast.toString(args.animationName)];
            let i = 1;
            while (args[`ANIMATIONMAME_${i}`]) {
                animationNames.push(args[`ANIMATIONMAME_${i}`])
                i++;
            }

            if (name in this.animations) {
                animationNames.forEach((animationName) => {
                    if (animationName in this.animations[name].action) {
                        this.animations[name].action[animationName].stop();
                    }
                })
            }
        }

        /**
         * 推进并更新动画
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.time
         */

        updateAnimation({ name, time }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);

            time = Cast.toNumber(time);
            if (name in this.animations && this.animations[name].mixer) {
                this.animations[name].mixer.update(time / 1000);
            }
        }

        /**
         * 获取物体所有的动画
         * @param {object} args
         * @param {string} args.name
         */

        getAnimation({ name }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);

            if (name in this.animations && this.animations[name].clips) {
                const clips = [];
                for (let i = 0; i < this.animations[name].clips.length; i++) {
                    clips.push(this.animations[name].clips[i].name);
                }
                return JSON.stringify(clips);
            } else {
                return "[]";
            }
        }

        /**
         * 删除物体
         * @param {object} args
         * @param {string} args.name
         */

        deleteObject(args) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            let i = 1;
            this.releaseDuplicates(Cast.toString(args.name));
            while (args[`NAME_${i}`]) {
                this.releaseDuplicates(args[`NAME_${i}`]);
                i++;
            }
            this.render()
        }

        rotationObject({ name, x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.objects) {
                // 设置旋转角度
                this.objects[name].rotation.set(
                    THREE.MathUtils.degToRad(Cast.toNumber(x)),

                    THREE.MathUtils.degToRad(Cast.toNumber(y)),

                    THREE.MathUtils.degToRad(Cast.toNumber(z)),
                );
                this.render()
            } else {
                return;
            }
        }

        moveObject({ name, x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.objects) {
                // 设置坐标
                this.objects[name].position.set(
                    Cast.toNumber(x),

                    Cast.toNumber(y),

                    Cast.toNumber(z),
                );
                this.render()
            } else {
                return;
            }
        }

        scaleObject({ name, x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.objects) {
                // 设置缩放
                this.objects[name].scale.set(
                    Cast.toNumber(x),

                    Cast.toNumber(y),

                    Cast.toNumber(z),
                );
                this.render()
            } else {
                return;
            }
        }

        /**
         * 获取物体坐标
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.xyz
         */
        getObjectPos({ name, xyz }) {
            name = Cast.toString(name);
            if (name in this.objects) {
                switch (Cast.toString(xyz)) {
                    case "x":
                        return this.objects[name].position.x;
                    case "y":
                        return this.objects[name].position.y;
                    case "z":
                        return this.objects[name].position.z;
                }
            } else {
                return;
            }
        }

        /**
         * 获取物体旋转角度
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.xyz
         */

        getObjectRotation({ name, xyz }) {
            name = Cast.toString(name);
            if (name in this.objects) {
                switch (Cast.toString(xyz)) {
                    case "x":
                        return THREE.MathUtils.radToDeg(
                            this.objects[name].rotation.x,
                        );
                    case "y":
                        return THREE.MathUtils.radToDeg(
                            this.objects[name].rotation.y,
                        );
                    case "z":
                        return THREE.MathUtils.radToDeg(
                            this.objects[name].rotation.z,
                        );
                }
            } else {
                return;
            }
        }

        /**
         * 获取物体缩放
         * @param {object} args
         * @param {string} args.name
         * @param {string} args.xyz
         */
        getObjectScale({ name, xyz }) {
            name = Cast.toString(name);
            if (name in this.objects) {
                switch (Cast.toString(xyz)) {
                    case "x":
                        return this.objects[name].scale.x;
                    case "y":
                        return this.objects[name].scale.y;
                    case "z":
                        return this.objects[name].scale.z;
                }
            } else {
                return;
            }
        }

        /**
         * 创建或重置点光源
         * [name] 颜色: [color] 光照强度: [intensity] 位置:x[x] y[y] z[z]
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.color
         * @param {number} args.intensity
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         * @param {number} args.decay
         * @param {string} args.YN
         */

        makePointLight({ name, color, intensity, x, y, z, decay, YN }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            // 创建点光源
            if (name in this.lights) {
                this._deleteObject(this.lights[name]);
                this.lights[name].dispose();
            }
            this.lights[name] = new THREE.PointLight(
                Cast.toNumber(color),

                Cast.toNumber(intensity),
                0,

                Cast.toNumber(decay),
            ); //创建光源
            this.lights[name].position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            ); //设置光源的位置

            this.lights[name].shadow.bias = -0.00005;

            if (Cast.toString(YN) == "true") {
                this.lights[name].castShadow = true;
            }
            this.scene.add(this.lights[name]); //在场景中添加光源
            this.render()
        }

        makeDirectionalLight({ name, color, intensity, x, y, z, x2, y2, z2, YN }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            // 创建点光源
            if (name in this.lights) {
                this._deleteObject(this.lights[name]);
                this.lights[name].dispose();
            }
            this.lights[name] = new THREE.DirectionalLight(
                Cast.toNumber(color),
                Cast.toNumber(intensity)
            ); //创建光源

            this.lights[name].position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            ); //设置光源的位置
            this.lights[name].target.position.set(
                Cast.toNumber(x),

                Cast.toNumber(y),

                Cast.toNumber(z),
            ); //设置光源目标的位置

            this.lights[name].shadow.bias = -0.00005;
            if (Cast.toString(YN) == "true") {
                this.lights[name].castShadow = true;
            }

            // 设置平行光范围大一点。
            this.lights[name].shadow.camera.left = -20;
            this.lights[name].shadow.camera.right = 20;
            this.lights[name].shadow.camera.top = 20;
            this.lights[name].shadow.camera.bottom = -20;
            this.lights[name].shadow.camera.near = 0.1;
            this.lights[name].shadow.camera.far = 1000;

            this.scene.add(this.lights[name]); //在场景中添加光源
            this.render()
        }



        /**
         * 设置平行光的阴影投射范围
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.left
         * @param {number} args.right
         * @param {number} args.top
         * @param {number} args.bottom
        */
        setDirectionalLightShawdowCamera({ name, left, right, top, bottom }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.lights) {
                if (this.lights[name].type === "DirectionalLight") {
                    let _camera = new THREE.OrthographicCamera(
                        Cast.toNumber(left),
                        Cast.toNumber(right),
                        Cast.toNumber(top),
                        Cast.toNumber(bottom),
                        this.lights[name].shadow.camera.near,
                        this.lights[name].shadow.camera.far
                    )
                    _camera.zoom = this.lights[name].shadow.camera.zoom;
                    this.lights[name].shadow.camera = _camera;
                }
            }
        }

        /**
         * 设置光源阴影贴图大小
         * @param {object} args
         * @param {string} args.name
         * @param {number} args.xsize
         * @param {number} args.ysize
         */
        setLightMapSize({ name, xsize, ysize }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.lights) {
                this.lights[name].shadow.mapSize.width = Cast.toNumber(xsize);
                this.lights[name].shadow.mapSize.height = Cast.toNumber(ysize);
                console.log(this.lights[name].shadow);
            }
        }

        moveLight({ name, x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            name = Cast.toString(name);
            if (name in this.lights) {
                // 设置坐标
                this.lights[name].position.set(
                    Cast.toNumber(x),

                    Cast.toNumber(y),

                    Cast.toNumber(z),
                );
                this.render()
            } else {
                return;
            }
        }

        getLightPos({ name, xyz }) {
            name = Cast.toString(name);
            if (name in this.lights) {
                switch (Cast.toString(xyz)) {
                    case "x":
                        return this.lights[name].position.x;
                    case "y":
                        return this.lights[name].position.y;
                    case "z":
                        return this.lights[name].position.z;
                }
            } else {
                return;
            }
        }

        deleteLight(args) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            let name = Cast.toString(args.name), i = 1;

            if (name in this.lights) {
                this._deleteObject(this.lights[name]);
            }

            while (args[`NAME_${i}`]) {
                if (args[`NAME_${i}`] in this.lights) {
                    this._deleteObject(this.lights[args[`NAME_${i}`]]);
                }
                i++;
            }
            this.render()
        }

        /**
         * 设置环境光颜色
         * @param {object} args
         * @param {number} args.color
         * @param {number} args.intensity
         */

        setAmbientLightColor({ color, intensity }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            // 设置环境光颜色
            this.ambient_light.color = new THREE.Color(Cast.toNumber(color));

            this.ambient_light.intensity = Cast.toNumber(intensity);
            this.render()
        }

        /**
         * 设置环境光颜色
         * @param {object} args
         * @param {number} args.skyColor
         * @param {number} args.groundColor
         * @param {number} args.intensity
         */

        setHemisphereLightColor({ skyColor, groundColor, intensity }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            // 设置环境光颜色
            this.hemisphere_light.color = new THREE.Color(
                Cast.toNumber(skyColor),
            );
            this.hemisphere_light.groundColor = new THREE.Color(
                Cast.toNumber(groundColor),
            );

            this.hemisphere_light.intensity = Cast.toNumber(intensity);
            this.render()
        }

        /**
         * 移动相机
         * @param {object} args
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         */

        moveCamera({ x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            if (!this.controls.enabled) {
                this.camera.position.set(
                    Cast.toNumber(x),

                    Cast.toNumber(y),

                    Cast.toNumber(z),
                );
                this.render()
            }
        }

        /**
         * 旋转相机
         * @param {object} args
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         */

        rotationCamera({ x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            if (!this.controls.enabled) {
                this.camera.rotation.set(
                    THREE.MathUtils.degToRad(Cast.toNumber(x)),

                    THREE.MathUtils.degToRad(Cast.toNumber(y)),

                    THREE.MathUtils.degToRad(Cast.toNumber(z)),
                );
                this.render()
            }
        }

        /**
         * 让相机面向
         * @param {object} args
         * @param {number} args.x
         * @param {number} args.y
         * @param {number} args.z
         */
        cameraLookAt({ x, y, z }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            if (!this.controls.enabled) {
                this.camera.lookAt(
                    Cast.toNumber(x),

                    Cast.toNumber(y),

                    Cast.toNumber(z),
                );
                this.controls.target = new THREE.Vector3(x, y, z);
                this.render();
            }
        }

        /**
         * 获取相机坐标
         * @param {object} args
         * @param {string} args.xyz
         */
        getCameraPos({ xyz }) {
            if (!this.camera) {
                return;
            }

            switch (Cast.toString(xyz)) {
                case "x":
                    return this.camera.position.x;
                case "y":
                    return this.camera.position.y;
                case "z":
                    return this.camera.position.z;
            }
        }

        /**
         * 获取相机旋转角度
         * @param {object} args
         * @param {string} args.xyz
         */

        getCameraRotation({ xyz }) {
            if (!this.camera) {
                return;
            }

            switch (Cast.toString(xyz)) {
                case "x":
                    return THREE.MathUtils.radToDeg(this.camera.rotation.x);
                case "y":
                    return THREE.MathUtils.radToDeg(this.camera.rotation.y);
                case "z":
                    return THREE.MathUtils.radToDeg(this.camera.rotation.z);
            }
        }

        /**
         * 鼠标控制相机
         * @param {object} args
         * @param {string} args.yn1
         * @param {string} args.yn2
         * @param {string} args.yn3
         */

        controlCamera({ yn1, yn2, yn3 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            let enablePan = false;
            let enableZoom = false;
            let enableRotate = false;
            if (yn1 == "true") {
                enablePan = true;
            }
            if (yn2 == "true") {
                enableZoom = true;
            }
            if (yn3 == "true") {
                enableRotate = true;
            }

            this.controls.enablePan = enablePan;
            this.controls.enableZoom = enableZoom;
            this.controls.enableRotate = enableRotate;
            this.controls.update();
        }

        setControlState({ YN }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            if (Cast.toString(YN) == "true") {
                this.controls.enabled = true;
            } else {
                this.controls.enabled = false;
            }
            this.controls.update();
        }

        mouseCanControlCamera({ }) {
            if (!this.tc) {
                return false;
            }
            return this.controls.enabled;
        }

        /**
         * 启用/禁用鼠标控制相机惯性
         * @param {object} args
         * @param {string} args.YN2
         */

        setControlCameraDamping({ YN2 }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            if (Cast.toString(YN2) == "yes") {
                this.controls.enableDamping = true;
            } else {
                this.controls.enableDamping = false;
            }
        }

        /**
         * 获取鼠标控制相机惯性状态
         * @param {object} args
         * @param {number} args.num
         */

        setControlCameraDampingNum({ num }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }

            this.controls.dampingFactor = Cast.toNumber(num);
        }

        /**
         * 启用雾效果并设置雾颜色
         * @param {object} args
         * @param {number} args.color
         * @param {number} args.near
         * @param {number} args.far
         */

        enableFogEffect({ color, near, far }) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            this.scene.fog = new THREE.Fog(
                Cast.toNumber(color),

                Cast.toNumber(near),

                Cast.toNumber(far),
            );
            this.render()
        }

        /**
         * 禁用雾效果
         */

        disableFogEffect(args) {
            if (!this.tc) {
                return "⚠️显示器未初始化！";
            }
            this.scene.fog = null;
            this.render()
        }

        /**
         * 处理颜色
         * @param {object} args
         * @param {number} args.R
         * @param {number} args.G
         * @param {number} args.B
         * @return {number}
         */
        color_({ R, G, B }) {
            return (
                Math.min(Math.max(Cast.toNumber(R), 0), 255) * 65536 +
                Math.min(Math.max(Cast.toNumber(G), 0), 255) * 256 +
                Math.min(Math.max(Cast.toNumber(B), 0), 255)
            );
        }
    }

    extensions.register(new RenderTheWorld(runtime));
    window.tempExt = {
        Extension: RenderTheWorld,
        info: {
            name: "RenderTheWorld.name",
            description: "RenderTheWorld.descp",
            extensionId: chen_RenderTheWorld_extensionId,
            iconURL: chen_RenderTheWorld_picture,
            insetIconURL: chen_RenderTheWorld_icon,
            featured: true,
            disabled: false,
            collaborator: "陈思翰 @ CCW",
            collaboratorURL:
                "https://www.ccw.site/student/643bb84051bc32279f0c3fa0",
            collaboratorList: [
                {
                    collaborator: "陈思翰 @ CCW",
                    collaboratorURL:
                        "https://www.ccw.site/student/643bb84051bc32279f0c3fa0",
                },
                {
                    collaborator: "Fath11@Cocrea",
                    collaboratorURL:
                        "https://cocrea.world/@Fath11",
                },
            ],
        },
        l10n: {
            "zh-cn": {
                "RenderTheWorld.name": "渲染世界",
                "RenderTheWorld.descp": "立体空间, WebGL帮你实现!",
            },
            en: {
                "RenderTheWorld.name": "Render The World",
                "RenderTheWorld.descp": "WebGL Start!",
            },
        },
    };
})(Scratch);
