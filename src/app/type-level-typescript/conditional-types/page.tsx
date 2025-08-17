import Image from 'next/image';
import aIsAssignableToB from '../../../../public/images/type-level-typescript/conditional-types/a-is-assignable-to-b.74cf1682.svg';
export default function Page() {
  return (
    <div className="">
      <h1
        className="py-4 relative x-text text-5xl md:text-6xl md:leading-snug leading-snug font-black my-8"
        id="code-branching-with-conditional-types"
      >
        Code branching with Conditional Types
      </h1>

      <p className={'mt-4'}>
        After learning about the many kinds of types we can play with in the three previous
        chapters, it's time to implement <strong>our first type-level algorithms!</strong> We
        finally get to write some actual code in the language of types. Yay! 🎉🎉🎉
      </p>

      <p className={'mt-4'}>
        In every programming language, the most basic form of algorithmic logic is{' '}
        <strong>code branching</strong>. The <code>if</code> and <code>else</code> statements count
        almost certainly among the first lines of code you have ever written, so I suspect you know
        how important and widespread they are in programming.
      </p>

      <pre className={'mt-4 p-'}>
        <code>{`if (trafficLight === "green") go();
else stop();`}</code>
      </pre>

      <p className={'mt-4'}>
        Being a Turing Complete <strong>programming language</strong>, the{' '}
        <strong>type system</strong> of TypeScript of course supports code branching! But what are
        use cases for executing different code paths in our types, and how would we even do that?
        Let's find out!
      </p>

      <h2 className={'mt-4'}>Anatomy of a Conditional Type</h2>

      <p className={'mt-4'}>
        In Type-level TypeScript, code branching is known as <strong>Conditional Types</strong>. The
        syntax is very similar to the Ternary Operators we use in JavaScript:
      </p>

      <pre className={'mt-4 p-4'}>
        <code>{`type TrueOrFalse = A extends B ? true : false;
/*                 -----------   ----   -----
                      ^          /         \\
                 condition    branch     branch
                             if true    if false
          
                   \\-------------------------/
                                ^
                        Conditional Type
*/`}</code>
      </pre>

      <p className={'mt-4'}>
        Since the language of types is <strong>functional</strong>, it tends to guide developers
        towards writing expressions rather than statements. There are no <code>if</code> or{' '}
        <code>else</code> statements at the type level. Instead, we will exclusively write ternary
        expressions using <code>?</code> and <code>:</code>.
      </p>

      <h2 className={'mt-4'}>
        The <code>extends</code> keyword
      </h2>

      <p className={'mt-4'}>
        Before the question mark stands a condition. It's always of the form{' '}
        <code>A extends B</code>, which is how you ask "Is A assignable to B?" to the type checker.
      </p>

      <p className={'mt-4 text-3xl italic text-center'}>
        "A extends B" means "Is A assignable to B?"
      </p>

      <p className={'mt-4'}>
        We touched on the topic of assignability several times already so you should already know
        that "A is assignable to B" means that the set of values defined by the type B includes the
        set of values defined by the type A.
      </p>

      <Image className="mt-4 mx-auto" src={aIsAssignableToB} alt={''} />

      <p className={'mt-4 italic text-center'}>type A is assignable to type B</p>

      <p className={'mt-4'}>
        Check out Types Are Just Data if you want a refresher. Assignability is such an important
        and complex concept that we will dedicate an upcoming chapter to cover the part that isn't
        so intuitive about it.
      </p>

      <p className={'mt-4'}>
        Note that <code>A extends B</code> does not return a boolean literal like <code>true</code>{' '}
        or <code>false</code>. You can't replace it with a hard-coded boolean type:
      </p>

      <pre className={'mt-4 p-4'}>
        <code>{`type T = true ? true : false;
//       ^ ❌ Syntax error: TS expects an expression
//                          of the form "A extends B"`}</code>
      </pre>

      <p className={'mt-4'}>
        This also means you can't assign <code>A extends B</code> to a variable:
      </p>

      <pre className={'mt-4 p-4'}>
        <code>{`type T = 2 extends number;
//         ^ ❌ Syntax error:
//              invalid use of \`extends\`.`}</code>
      </pre>

      <p className={'mt-4'}>
        To have a valid Conditional Type, you need a full <code>A extends B ? ... : ...</code>{' '}
        expression:
      </p>

      <pre className={'mt-4 p-4'}>
        <code>{`type T = 2 extends number;
//         ^ ❌ Syntax error:
//              invalid use of \`extends\`.`}</code>
      </pre>
    </div>
  );
}
