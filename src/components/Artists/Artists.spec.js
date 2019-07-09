import React from "react";
import renderer from "react-test-renderer";

import Artists from "./Artists";

describe("<Artists />", () => {
  it("renders nothing if no artists are supplied", () => {
    const tree = renderer.create(<Artists />).toJSON();

    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it("renders an empty container if there are no artists", () => {
    const tree = renderer.create(<Artists artists={[]} />).toJSON();

    expect(tree).toMatchInlineSnapshot(
      { props: { className: expect.any(String) } },
      `
                  Object {
                    "children": null,
                    "props": Object {
                      "className": Any<String>,
                    },
                    "type": "div",
                  }
            `
    );
  });

  it("renders with a single artist", () => {
    const tree = renderer
      .create(
        <Artists
          artists={[
            {
              id: "id",
              name: "name"
            }
          ]}
        />
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(
      { props: { className: expect.any(String) } },
      `
            Object {
              "children": Array [
                <span>
                  <span>
                    name
                  </span>
                </span>,
              ],
              "props": Object {
                "className": Any<String>,
              },
              "type": "div",
            }
        `
    );
  });

  it("renders with a single artist", () => {
    const tree = renderer
      .create(
        <Artists
          artists={[
            {
              id: "id1",
              name: "name1"
            },
            {
              id: "id2",
              name: "name2"
            }
          ]}
        />
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(
      { props: { className: expect.any(String) } },
      `
      Object {
        "children": Array [
          <span>
            <span>
              name1
            </span>
            <span>
              |
            </span>
          </span>,
          <span>
            <span>
              name2
            </span>
          </span>,
        ],
        "props": Object {
          "className": Any<String>,
        },
        "type": "div",
      }
    `
    );
  });
});
