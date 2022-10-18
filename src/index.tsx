import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

type GridComponents<T extends string> = {
  [c in Exclude<T, '.'>]: React.FunctionComponent<Props>;
};

type IGrid<T extends string> = React.FunctionComponent<Props> & GridComponents<T>;
interface CreateGridArgs<T extends string> {
  grid: Array<Array<T>>;
}
type StraightGrid<T extends string> = Array<Array<T>>;

/**
 * Use like:
 *
 * const MyGrid = createGrid([
 *   ['.', 'Header',  'Header',  '.',       '.',       '.'],
 *   ['.', 'Content', 'Content', 'Content', 'Content', '.'],
 *   ['.', 'Footer',  'Footer',  'Footer',  'Footer',  '.'],
 * ]);
 *
 * This will provide you with a set of React components that are
 * thin wrappers around divs for positioning your content:
 *
 * <MyGrid>
 *   <MyGrid.Header></MyGrid.Header>
 *   <MyGrid.Content></MyGrid.Content>
 *   <MyGrid.Footer></MyGrid.Footer>
 * </MyGrid>
 *
 * All type checked.
 */
export function createGrid<T extends string>(arg: StraightGrid<T> | CreateGridArgs<T>): IGrid<T> {
  const grid = Array.isArray(arg) ? arg : arg.grid;
  const gridString = `${grid
    .map((line) => `'${line.join(' ')}'`)
    .join(' ')
    .trim()}`;

  function Grid({ children, style, ...rest }: Props) {
    return (
      <div
        style={{
          ...style,
          display: 'grid',
          gridTemplateAreas: gridString,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }

  for (const line of grid) {
    for (const component of line) {
      if (component !== '.') {
        (Grid as unknown as Record<string, React.FunctionComponent<Props>>)[component] = ({
          style,
          children,
          ...rest
        }) => (
          <div style={{ ...style, gridArea: component }} {...rest}>
            {children}
          </div>
        );
      }
    }
  }

  return Grid as unknown as IGrid<T>;
}
