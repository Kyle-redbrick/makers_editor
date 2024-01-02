import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import * as request from "../../../../../Common/Util/HTTPRequest";
import { URL } from "../../../../../Common/Util/Constant";
import "./index.scss";

import closeBtn from "../../../../../Image/newPython/python-popup-close-btn@2x.png";

import { playTabEffect, playButtonEffect } from "../../../Util/PlaySound";

const PythonCollection = (props) => {
  const { dismiss, isShowProjectItems } = props;
  const [PYId, setPYId] = useState("");
  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState(0);
  const [selectedKeywordIdx, setSelectedKeywordIdx] = useState(0);
  const [itemBookList, setItemBookList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const selectedItemBook = collectionList[selectedKeywordIdx];
  const PYItemBook = [
    {
      id: 1,
      title: "API",
      localized: [
        {
          locale: "ko",
          title: "API",
        },
      ],
      itemBooks: [
        {
          id: 1,
          categoryId: 1,
          itemName: "print",
          fileName: "01_print.png",
          description: "print 함수",
          dreamProjectId: 96,
          localized: [
            {
              locale: "ko",
              itemName: "print",
              description: "print 함수",
              fileName: "0350fb3e6342ae5bf84dc876edefc3cd.png",
            },
          ],
        },
        {
          id: 2,
          categoryId: 1,
          itemName: "int",
          fileName: "04_int.png",
          description: "값을 정수로 변환해주는 함수이다",
          dreamProjectId: 97,
          localized: [
            {
              locale: "ko",
              itemName: "int",
              description: "값을 정수로 변환해주는 함수이다",
              fileName: "75f644538209528f2057ef95e2fef7f6.png",
            },
          ],
        },
        {
          id: 3,
          categoryId: 1,
          itemName: "len",
          fileName: "06_len.png",
          description: "문자열의 길이를 반환해주는 함수이다.",
          dreamProjectId: 98,
          localized: [
            {
              locale: "ko",
              itemName: "len",
              description: "문자열의 길이를 반환해주는 함수이다.",
              fileName: "25a3698b24221eac52ef2cfa8e96ed35.png ",
            },
          ],
        },
        {
          id: 4,
          categoryId: 1,
          itemName: "replace",
          fileName: "12_replace.png",
          description: "문자열의 값을 치환하는 함수이다.\r\n",
          dreamProjectId: 100,
          localized: [
            {
              locale: "ko",
              itemName: "replace",
              description: "문자열의 값을 치환하는 함수이다.\r\n",
              fileName: "2740fc176f894d91ec77483025978a75.png",
            },
          ],
        },
        {
          id: 5,
          categoryId: 1,
          itemName: "split",
          fileName: "14_split.png",
          description: "구분자를 기준으로 문자열을 나누는 함수이다.",
          dreamProjectId: 101,
          localized: [
            {
              locale: "ko",
              itemName: "split",
              description: "구분자를 기준으로 문자열을 나누는 함수이다.",
              fileName: "29e48ebbe464caf9f8498e6553b748a5.png",
            },
          ],
        },
        {
          id: 6,
          categoryId: 1,
          itemName: "sort",
          fileName: "15_sort.png",
          description: "리스트의 요소를 오름차순으로 정렬하는 함수이다.",
          dreamProjectId: 101,
          localized: [
            {
              locale: "ko",
              itemName: "sort",
              description: "리스트의 요소를 오름차순으로 정렬하는 함수이다.",
              fileName: "01cd2ed84dc07da49250cc97223ae6d8.png",
            },
          ],
        },
        {
          id: 7,
          categoryId: 1,
          itemName: "range",
          fileName: "17_for循环语句.png",
          description: "연속된 정수를 만드는 함수이다.",
          dreamProjectId: 102,
          localized: [
            {
              locale: "ko",
              itemName: "range",
              description: "연속된 정수를 만드는 함수이다.",
              fileName: "40fdaf35ce5796f64f194f5358a9a9fe.png",
            },
          ],
        },
        {
          id: 8,
          categoryId: 1,
          itemName: "append",
          fileName: "25_append.png",
          description: "리스트의 마지막에 요소를 추가하는 함수이다.",
          dreamProjectId: 106,
          localized: [
            {
              locale: "ko",
              itemName: "append",
              description: "리스트의 마지막에 요소를 추가하는 함수이다.",
              fileName: "47924cef0cd8c17c7348637106006385.png",
            },
          ],
        },
        {
          id: 9,
          categoryId: 1,
          itemName: "bin",
          fileName: "27_bin.png",
          description: "2진수를 문자열 형식으로 변환하는 함수이다.",
          dreamProjectId: 107,
          localized: [
            {
              locale: "ko",
              itemName: "bin",
              description: "2진수를 문자열 형식으로 변환하는 함수이다.",
              fileName: "aac4aa0223c25c20c79973bf7f4aa0f1.png",
            },
          ],
        },
        {
          id: 10,
          categoryId: 1,
          itemName: "join",
          fileName: "d7cf25598a7e9b52175da1d54f763c45.png",
          description:
            "리스트 요소들을 합하여 구분자가 추가된 문자열로 변환하는 함수이다.",
          dreamProjectId: 110,
          localized: [
            {
              locale: "ko",
              itemName: "join",
              description:
                "리스트 요소들을 합하여 구분자가 추가된 문자열로 변환하는 함수이다.",
              fileName: "d7cf25598a7e9b52175da1d54f763c45.png",
            },
          ],
        },
        {
          id: 11,
          categoryId: 1,
          itemName: "keys",
          fileName: "302613f8b5267cc4ccb4c21a0f241c95.png",
          description: "딕셔너리 내 모든 key를 보여주는 함수이다.",
          dreamProjectId: 112,
          localized: [
            {
              locale: "ko",
              itemName: "keys",
              description: "딕셔너리 내 모든 key를 보여주는 함수이다.",
              fileName: "302613f8b5267cc4ccb4c21a0f241c95.png",
            },
          ],
        },
        {
          id: 12,
          categoryId: 1,
          itemName: "values",
          fileName: "3cd591bc618b09a08e318611d2e90c6a.png",
          description: "딕셔너리 내 모든 value를 보여주는 함수이다. ",
          dreamProjectId: 112,
          localized: [
            {
              locale: "ko",
              itemName: "values",
              description: "딕셔너리 내 모든 value를 보여주는 함수이다. ",
              fileName: "3cd591bc618b09a08e318611d2e90c6a.png",
            },
          ],
        },
        {
          id: 13,
          categoryId: 1,
          itemName: "items",
          fileName: "41c81ca297d533d79db471af34f84431.png",
          description: "딕셔너리 내 모든 item를 보여주는 함수이다. ",
          dreamProjectId: 112,
          localized: [
            {
              locale: "ko",
              itemName: "items",
              description: "딕셔너리 내 모든 item를 보여주는 함수이다. ",
              fileName: "41c81ca297d533d79db471af34f84431.png",
            },
          ],
        },
        {
          id: 14,
          categoryId: 1,
          itemName: "get",
          fileName: "349989a50ab69e4efcbf03ea029bf379.png",
          description: "key에 대응하는 value를 불러오는 함수이다.",
          dreamProjectId: 113,
          localized: [
            {
              locale: "ko",
              itemName: "get",
              description: "key에 대응하는 value를 불러오는 함수이다.",
              fileName: "349989a50ab69e4efcbf03ea029bf379.png",
            },
          ],
        },
        {
          id: 15,
          categoryId: 1,
          itemName: "max",
          fileName: "b8b372795ab50dff94e4ef5cb69ea7dd.png",
          description: "여러 개의 값 중에서 가장 큰 값을 반환해주는 함수이다.",
          dreamProjectId: 114,
          localized: [
            {
              locale: "ko",
              itemName: "max",
              description:
                "여러 개의 값 중에서 가장 큰 값을 반환해주는 함수이다.",
              fileName: "b8b372795ab50dff94e4ef5cb69ea7dd.png",
            },
          ],
        },
        {
          id: 16,
          categoryId: 1,
          itemName: "isalpha",
          fileName: "27acc4301d86bd66c5458646bc311a7f.png",
          description: "문자열이 알파벳만으로 구성되었는지 판단하는 함수이다.",
          dreamProjectId: 115,
          localized: [
            {
              locale: "ko",
              itemName: "isalpha",
              description:
                "문자열이 알파벳만으로 구성되었는지 판단하는 함수이다.",
              fileName: "27acc4301d86bd66c5458646bc311a7f.png",
            },
          ],
        },
        {
          id: 17,
          categoryId: 1,
          itemName: "zip",
          fileName: "a23c002c4af2f5611721345773c11b90.png",
          description: "동일한 개수의 데이터를 묶어주는 내장함수이다.",
          dreamProjectId: 116,
          localized: [
            {
              locale: "ko",
              itemName: "zip",
              description: "동일한 개수의 데이터를 묶어주는 내장함수이다.",
              fileName: "a23c002c4af2f5611721345773c11b90.png",
            },
          ],
        },
        {
          id: 18,
          categoryId: 1,
          itemName: "set",
          fileName: "c92172f6c454e2101e98b9caa0765085.png",
          description: "집합 자료형으로 변환하는 함수이다.",
          dreamProjectId: 118,
          localized: [
            {
              locale: "ko",
              itemName: "set",
              description: "집합 자료형으로 변환하는 함수이다.",
              fileName: "c92172f6c454e2101e98b9caa0765085.png",
            },
          ],
        },
        {
          id: 19,
          categoryId: 1,
          itemName: "pop",
          fileName: "208926b89c7b8ddff81d51923a24cb20.png",
          description: "딕셔너리 key 값에 대응하는 item을 삭제하는 함수이다.",
          dreamProjectId: 120,
          localized: [
            {
              locale: "ko",
              itemName: "pop",
              description:
                "딕셔너리 key 값에 대응하는 item을 삭제하는 함수이다.",
              fileName: "208926b89c7b8ddff81d51923a24cb20.png",
            },
          ],
        },
        {
          id: 20,
          categoryId: 1,
          itemName: "list",
          fileName: "ae819195db7452670068560477a254b8.png",
          description: "문자열을 리스트로 변환해주는 함수이다. ",
          dreamProjectId: 120,
          localized: [
            {
              locale: "ko",
              itemName: "list",
              description: "문자열을 리스트로 변환해주는 함수이다. ",
              fileName: "ae819195db7452670068560477a254b8.png",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "자료형",
      localized: [
        {
          locale: "ko",
          title: "자료형",
        },
      ],
      itemBooks: [
        {
          id: 21,
          categoryId: 2,
          itemName: "변수",
          fileName: "03_变量.png",
          description: "어떤 값을 저장하기 위해 이름을 붙인 공간이다",
          dreamProjectId: 97,
          localized: [
            {
              locale: "ko",
              itemName: "변수",
              description: "어떤 값을 저장하기 위해 이름을 붙인 공간이다",
              fileName: "af74d0e4e019b334ee96ed26be08ddee.png",
            },
          ],
        },
        {
          id: 22,
          categoryId: 2,
          itemName: "문자열",
          fileName: "05_字符串.png",
          description: "문자, 단어 등으로 구성된 문자들의 집합이다.",
          dreamProjectId: 98,
          localized: [
            {
              locale: "ko",
              itemName: "문자열",
              description: "문자, 단어 등으로 구성된 문자들의 집합이다.",
              fileName: "e985fb5473932501fa9fe56598477235.png",
            },
          ],
        },
        {
          id: 23,
          categoryId: 2,
          itemName: "문자열 연산",
          fileName: "07_字符串运算.png",
          description: "문자열에 산술연산자를 사용할 수 있다.",
          dreamProjectId: 98,
          localized: [
            {
              locale: "ko",
              itemName: "문자열 연산",
              description: "문자열에 산술연산자를 사용할 수 있다.",
              fileName: "8f053ba9b31b53efee658003bf4d6468.png",
            },
          ],
        },
        {
          id: 24,
          categoryId: 2,
          itemName: "인덱스",
          fileName: "08_索引.png",
          description: "문자열 내 문자들의 ‘순서’를 의미한다.",
          dreamProjectId: 99,
          localized: [
            {
              locale: "ko",
              itemName: "인덱스",
              description: "문자열 내 문자들의 ‘순서’를 의미한다.",
              fileName: "a12c62fa0064ca855319590bfa3ab869.png",
            },
          ],
        },
        {
          id: 25,
          categoryId: 2,
          itemName: "문자열 인덱싱",
          fileName: "09_字符串索引.png",
          description: "‘가리킨다’라는 의미이다.",
          dreamProjectId: 99,
          localized: [
            {
              locale: "ko",
              itemName: "문자열 인덱싱",
              description: "‘가리킨다’라는 의미이다.",
              fileName: "714ebbd1c3206163525640540e34f2df.png",
            },
          ],
        },
        {
          id: 26,
          categoryId: 2,
          itemName: "문자열 슬라이싱",
          fileName: "10_字符串切片.png",
          description: "원하는 구간의 문자를 추출한다.",
          dreamProjectId: 99,
          localized: [
            {
              locale: "ko",
              itemName: "문자열 슬라이싱",
              description: "원하는 구간의 문자를 추출한다.",
              fileName: " ae17f941ceb4f135ccd9049ee2fc467c.png ",
            },
          ],
        },
        {
          id: 27,
          categoryId: 2,
          itemName: "문자열 함수",
          fileName: "11_字符串函数.png",
          description: "문자열 자료형에 사용하는 함수가 내장되어 있다.\r\n",
          dreamProjectId: 100,
          localized: [
            {
              locale: "ko",
              itemName: "문자열 함수",
              description: "문자열 자료형에 사용하는 함수가 내장되어 있다.\r\n",
              fileName: "ddac8e054f156a955150ba926832adf8.png",
            },
          ],
        },
        {
          id: 28,
          categoryId: 2,
          itemName: "리스트",
          fileName: "13_列表.png",
          description: "순서가 있는 요소들의 집합이다.",
          dreamProjectId: 101,
          localized: [
            {
              locale: "ko",
              itemName: "리스트",
              description: "순서가 있는 요소들의 집합이다.",
              fileName: "e121373732f778564ca592e8d8d4db81.png",
            },
          ],
        },
        {
          id: 29,
          categoryId: 2,
          itemName: "리스트 인덱싱",
          fileName: "16_列表索引.png",
          description: "리스트 내 요소의 순서로 0부터 시작한다.",
          dreamProjectId: 101,
          localized: [
            {
              locale: "ko",
              itemName: "리스트 인덱싱",
              description: "리스트 내 요소의 순서로 0부터 시작한다.",
              fileName: "c87ad3bd8df24a34fac7328b284228e1.png",
            },
          ],
        },
        {
          id: 30,
          categoryId: 2,
          itemName: "2진수",
          fileName: "26_二进制数.png",
          description: "이진수, binary number\r\n",
          dreamProjectId: 107,
          localized: [
            {
              locale: "ko",
              itemName: "2진수",
              description: "이진수, binary number\r\n",
              fileName: "e51a68def1f8572ca89feffd306631be.png",
            },
          ],
        },
        {
          id: 31,
          categoryId: 2,
          itemName: "2차원 리스트",
          fileName: "afad471b362b16d59fcc940c1e4bdc6b.png",
          description: "리스트 안에 리스트가 들어 있는 형태이다. ",
          dreamProjectId: 108,
          localized: [
            {
              locale: "ko",
              itemName: "2차원 리스트",
              description: "리스트 안에 리스트가 들어 있는 형태이다. ",
              fileName: "afad471b362b16d59fcc940c1e4bdc6b.png",
            },
          ],
        },
        {
          id: 32,
          categoryId: 2,
          itemName: "딕셔너리",
          fileName: "a64ece6e7aab52686ff8a36f11813fa6.png",
          description: "연관된 요소들의 짝을 배열하는 사전 형태의 자료형이다.",
          dreamProjectId: 111,
          localized: [
            {
              locale: "ko",
              itemName: "딕셔너리",
              description:
                "연관된 요소들의 짝을 배열하는 사전 형태의 자료형이다.",
              fileName: "a64ece6e7aab52686ff8a36f11813fa6.png",
            },
          ],
        },
        {
          id: 33,
          categoryId: 2,
          itemName: "사용자 함수",
          fileName: "6397c94ef8dae370d472a27bcbc10add.png",
          description: "호출되었을 때 실행되는, 독립적인 코드의 단위이다.",
          dreamProjectId: 117,
          localized: [
            {
              locale: "ko",
              itemName: "사용자 함수",
              description: "호출되었을 때 실행되는, 독립적인 코드의 단위이다.",
              fileName: "6397c94ef8dae370d472a27bcbc10add.png",
            },
          ],
        },
        {
          id: 34,
          categoryId: 2,
          itemName: "집합",
          fileName: "1d89b22c4872a0eb00d4060b1606cd38.png",
          description:
            "데이터의 모음으로 순서가 없고, 요소의 중복을 허용하지 않는 자료형이다.",
          dreamProjectId: 118,
          localized: [
            {
              locale: "ko",
              itemName: "집합",
              description:
                "데이터의 모음으로 순서가 없고, 요소의 중복을 허용하지 않는 자료형이다.",
              fileName: "1d89b22c4872a0eb00d4060b1606cd38.png",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "연산자",
      localized: [
        {
          locale: "ko",
          title: "연산자",
        },
      ],
      itemBooks: [
        {
          id: 35,
          categoryId: 3,
          itemName: "산술연산자",
          fileName: "02_算术运算符.png",
          description: "산술연산자는 덧셈, 뺄셈 등의 기호를  말한다. \r\n",
          dreamProjectId: 97,
          localized: [
            {
              locale: "ko",
              itemName: "산술연산자",
              description: "산술연산자는 덧셈, 뺄셈 등의 기호를  말한다. \r\n",
              fileName: "6e676d9fc1ce5720acafc16ded9d81c5.png",
            },
          ],
        },
        {
          id: 36,
          categoryId: 3,
          itemName: "비교연산자",
          fileName: "20_比较运算符.png",
          description: "숫자, 문자열 등 두 항목을 서로 비교하는 연산자이다.",
          dreamProjectId: 103,
          localized: [
            {
              locale: "ko",
              itemName: "비교연산자",
              description:
                "숫자, 문자열 등 두 항목을 서로 비교하는 연산자이다.",
              fileName: "3b242acb64aea7bc2341cb2c35527aa6.png",
            },
          ],
        },
        {
          id: 37,
          categoryId: 3,
          itemName: "논리연산자",
          fileName: "22_逻辑运算符.png",
          description: "조건의 참과 거짓에 따라 사용하는 연산자이다.",
          dreamProjectId: 104,
          localized: [
            {
              locale: "ko",
              itemName: "논리연산자",
              description: "조건의 참과 거짓에 따라 사용하는 연산자이다.",
              fileName: "0edd52a128dc6a0985865185afd7b616.png",
            },
          ],
        },
        {
          id: 38,
          categoryId: 3,
          itemName: "포함연산자",
          fileName: "24_成员运算符.png",
          description: "요소의 존재 여부를 판단하는 연산자이다.",
          dreamProjectId: 106,
          localized: [
            {
              locale: "ko",
              itemName: "포함연산자",
              description: "요소의 존재 여부를 판단하는 연산자이다.",
              fileName: "50177b35ec88b6a26dcec4567e5b7601.png",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "제어문",
      localized: [
        {
          locale: "ko",
          title: "제어문",
        },
      ],
      itemBooks: [
        {
          id: 39,
          categoryId: 4,
          itemName: "for 반복문",
          fileName: "17_for循环语句.png",
          description: "같은 일을 반복할 때 사용하는 제어문이다.",
          dreamProjectId: 102,
          localized: [
            {
              locale: "ko",
              itemName: "for 반복문",
              description: "같은 일을 반복할 때 사용하는 제어문이다.",
              fileName: "8752771f75591edb30b827e9412f12a8.png",
            },
          ],
        },
        {
          id: 40,
          categoryId: 4,
          itemName: "if 조건문",
          fileName: "19_if条件语句.png",
          description: "조건의 참과 거짓을 판단하는 제어문이다.",
          dreamProjectId: 103,
          localized: [
            {
              locale: "ko",
              itemName: "if 조건문",
              description: "조건의 참과 거짓을 판단하는 제어문이다.",
              fileName: "afb40b1015ac265bf0f90bbcb8b1b1fc.png",
            },
          ],
        },
        {
          id: 41,
          categoryId: 4,
          itemName: "elif 조건문",
          fileName: "21_elif条件语句.png",
          description: "조건의 참과 거짓을 판단하는 제어문이다.",
          dreamProjectId: 104,
          localized: [
            {
              locale: "ko",
              itemName: "elif 조건문",
              description: "조건의 참과 거짓을 판단하는 제어문이다.",
              fileName: "fb7f4af1a210c31d8ff24f2e5b238442.png",
            },
          ],
        },
        {
          id: 42,
          categoryId: 4,
          itemName: "while 반복문",
          fileName: "23_while循环语句.png",
          description: "같은 일을 반복할 때 사용하는 제어문이다.",
          dreamProjectId: 105,
          localized: [
            {
              locale: "ko",
              itemName: "while 반복문",
              description: "같은 일을 반복할 때 사용하는 제어문이다.",
              fileName: "712a87ed6f5e6f70b1c8df368fee8f86.png",
            },
          ],
        },
        {
          id: 43,
          categoryId: 4,
          itemName: "이중 반복문",
          fileName: "8aca0bc3c121bab87b9b3765247aa81e.png",
          description: "같은 일을 반복하는 반복문 구조를 중첩시킨 반복문이다.",
          dreamProjectId: 109,
          localized: [
            {
              locale: "ko",
              itemName: "이중 반복문",
              description:
                "같은 일을 반복하는 반복문 구조를 중첩시킨 반복문이다.",
              fileName: "8aca0bc3c121bab87b9b3765247aa81e.png",
            },
          ],
        },
        {
          id: 44,
          categoryId: 4,
          itemName: "반복 흐름 제어",
          fileName: "7b9885551ee7b36f9470b9e89ab17a2d.png",
          description:
            "continue - for, while 반복문의 실행 중 코드의 실행을 건너 뛰고 계속 진행하기 위해 사용한다. \r\nbreak - 반복문을 더이상 실행하지 않고 탈출하기 위해 사용한다.\r\n",
          dreamProjectId: 119,
          localized: [
            {
              locale: "ko",
              itemName: "반복 흐름 제어",
              description:
                "continue - for, while 반복문의 실행 중 코드의 실행을 건너 뛰고 계속 진행하기 위해 사용한다. \r\nbreak - 반복문을 더이상 실행하지 않고 탈출하기 위해 사용한다.\r\n",
              fileName: "7b9885551ee7b36f9470b9e89ab17a2d.png",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "기타",
      localized: [
        {
          locale: "ko",
          title: "기타",
        },
      ],
      itemBooks: [
        {
          id: 45,
          categoryId: 5,
          itemName: "줄바꿈 제거",
          fileName: "82c8238871c7ad5943407db5776cb0cd.png",
          description:
            "파이썬 print 함수로 값 출력시 자동적으로 줄바꿈하여 출력된다.",
          dreamProjectId: 116,
          localized: [
            {
              locale: "ko",
              itemName: "줄바꿈 제거",
              description:
                "파이썬 print 함수로 값 출력시 자동적으로 줄바꿈하여 출력된다.",
              fileName: "82c8238871c7ad5943407db5776cb0cd.png",
            },
          ],
        },
        {
          id: 46,
          categoryId: 5,
          itemName: "최소값 탐색",
          fileName: "04829bf0d358719107368dae84fab0c1.png",
          description: "리스트 요소 중 가장 작은 값을 탐색한다..",
          dreamProjectId: 120,
          localized: [
            {
              locale: "ko",
              itemName: "최소값 탐색",
              description: "리스트 요소 중 가장 작은 값을 탐색한다..",
              fileName: "04829bf0d358719107368dae84fab0c1.png",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    getPythonItemBook();
    setItemBookList(PYItemBook);
    PYItemBook.forEach((_itembooks, index) => {
      if (index === selectedCollectionIdx) {
        setCollectionList(_itembooks.itemBooks);
      }
    });
  }, []);

  // tutor만 현재 고려됨. 학생의 경우 progressId로 lessonId를 알아내는 과정이 추가로 필요함.
  const getPythonItemBook = () => {
    request
      .getPythonItembooks()
      .then((res) => res.json())
      .then((json) => json.data)
      .then((json) => {
        let lessonId = localStorage.getItem("PYLessonId");
        let flag = false;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < json[i].itemBooks.length; j++) {
            if (json[i]["itemBooks"][j].lessonId === lessonId) {
              setPYId(json[i]["itemBooks"][j].lessonItemBookId);
              flag = true;
              break;
            }
          }
          if (flag) {
            break;
          }
        }
      });
  };

  // API, 자료형, 연산자, 제어문, 기타 선택 (인덱스로)
  const handleCollectionTabAt = (index) => {
    playTabEffect();
    setSelectedCollectionIdx(index);
    setCollectionList(itemBookList[index].itemBooks);
  };

  const collectionStatus = ({ itemIndex, listProjectId }) => {
    let res = ""; // default open, selected false
    if (PYId === listProjectId && !isShowProjectItems) {
      // 현재의 프로젝트에서 획득가능한 아이템, 퀘스트 not cleared
      res = "lock";
    } else if (itemIndex === selectedKeywordIdx) {
      // 이전프로젝트에서 획득한 아이템 중에, selected체크
      res = "selected";
    }
    return res;
  };

  const selectedItemBookAvailable =
    selectedItemBook &&
    (selectedItemBook.dreamProjectId < PYId ||
      (selectedItemBook.dreamProjectId === PYId && isShowProjectItems));

  const getItemBookImage = (idx) => {
    if (collectionList[idx].localized[0].fileName !== "") {
      return `${URL.S3_DREAMCLASS}/${collectionList[idx].localized[0].fileName}`;
    } else {
      return `${URL.S3_DREAMCLASS}/${collectionList[idx].fileName}`;
    }
  };

  return (
    <div className="pythonCollectionPopup">
      <div className="popupTitle">
        <p className="titleName">
          {props.intl.formatMessage({ id: "ID_PYTHON_COLLECTION_TITLE" })}
        </p>
        <img
          className="closePopupBtn"
          onClick={() => dismiss()}
          src={closeBtn}
          alt="close button"
        />
      </div>
      <div className="popupBody">
        <div className="selectedCollectionWrapper">
          {selectedItemBook && (
            <>
              <p className="title">
                {selectedItemBookAvailable
                  ? selectedItemBook.localized[0]
                    ? selectedItemBook.localized[0].itemName
                    : selectedItemBook.itemName
                  : "???"}
              </p>
              <div className="detail">
                {selectedItemBookAvailable ? (
                  collectionList[selectedKeywordIdx].fileName ? (
                    <img
                      src={getItemBookImage(selectedKeywordIdx)}
                      alt="python detail img"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  props.intl.formatMessage({ id: "ID_PYTHON_NO_ITEM" })
                )}
              </div>
            </>
          )}
        </div>
        <div className="collectionListWrapper">
          <ul className="tabList">
            {itemBookList.map((tab, i) => {
              return (
                <li
                  className={`${i === selectedCollectionIdx ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedKeywordIdx(0);
                    handleCollectionTabAt(i);
                  }}
                  key={tab + i}
                >
                  {tab.localized[0] ? tab.localized[0].title : tab.title}
                </li>
              );
            })}
          </ul>
          <div className="itemListWrapper">
            <ul className="itemList">
              {collectionList.map((list, i) => {
                return (
                  <li
                    className={
                      list.dreamProjectId > PYId // collection의 projectId가 학습중인 PYId 보다 크면 lock
                        ? "lock"
                        : collectionStatus({
                            itemIndex: i,
                            listProjectId: list.dreamProjectId,
                          })
                    }
                    onClick={() => {
                      playButtonEffect(list.dreamProjectId);
                      setSelectedKeywordIdx(i);
                    }}
                    key={`collectionList_${i}`}
                  >
                    <span>
                      {list.localized[0]
                        ? list.localized[0].itemName
                        : list.itemName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(PythonCollection);
