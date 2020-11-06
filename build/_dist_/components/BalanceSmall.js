/* src/components/BalanceSmall.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

import { _ } from "../../web_modules/svelte-i18n.js";
import { isAddress } from "../../web_modules/@pie-dao/utils.js";
import images from "../config/images.json.proxy.js";
import pools from "../config/pools.json.proxy.js";
import { balanceKey, balances, eth } from "../stores/eth.js";
import { currentRoute } from "../stores/routes.js";
import { subscribeToBalance } from "./helpers.js";

function create_if_block(ctx) {
	let div2;
	let div1;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let h3;
	let t3;

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			img = element("img");
			t0 = space();
			h1 = element("h1");
			t1 = text(/*symbol*/ ctx[2]);
			t2 = space();
			h3 = element("h3");
			t3 = text(/*balance*/ ctx[0]);
			if (img.src !== (img_src_value = /*tokenLogo*/ ctx[3])) attr(img, "src", img_src_value);
			attr(img, "alt", /*symbol*/ ctx[2]);
			attr(div0, "class", "flex flex-row");
			attr(h3, "class", /*yourBalanceClass*/ ctx[1]);
			attr(div1, "class", "flex flex-col");
			attr(div2, "class", "small-balance-container");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			append(div0, img);
			append(div0, t0);
			append(div0, h1);
			append(h1, t1);
			append(div1, t2);
			append(div1, h3);
			append(h3, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*tokenLogo*/ 8 && img.src !== (img_src_value = /*tokenLogo*/ ctx[3])) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*symbol*/ 4) {
				attr(img, "alt", /*symbol*/ ctx[2]);
			}

			if (dirty & /*symbol*/ 4) set_data(t1, /*symbol*/ ctx[2]);
			if (dirty & /*balance*/ 1) set_data(t3, /*balance*/ ctx[0]);

			if (dirty & /*yourBalanceClass*/ 2) {
				attr(h3, "class", /*yourBalanceClass*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*balance*/ ctx[0] !== "" && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*balance*/ ctx[0] !== "") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $eth;
	let $balances;
	component_subscribe($$self, eth, $$value => $$invalidate(7, $eth = $$value));
	component_subscribe($$self, balances, $$value => $$invalidate(8, $balances = $$value));
	let { token } = $$props;
	let balance = "loading...";
	let key;
	let balanceClass = "blur-heavy";
	let yourBalanceClass = "blur-light";
	const address = $eth.address || window.localStorage.getItem("address");

	$$self.$$set = $$props => {
		if ("token" in $$props) $$invalidate(4, token = $$props.token);
	};

	let symbol;
	let tokenLogo;

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*token*/ 16) {
			$: $$invalidate(2, symbol = (pools[token] || {}).symbol);
		}

		if ($$self.$$.dirty & /*token*/ 16) {
			$: $$invalidate(3, tokenLogo = images.logos[token]);
		}

		if ($$self.$$.dirty & /*token*/ 16) {
			$: if (isAddress(token) && isAddress(address)) {
				balanceClass = "";
				$$invalidate(1, yourBalanceClass = "");
				$$invalidate(5, key = balanceKey(token, address));
				subscribeToBalance(token, address);
			}
		}

		if ($$self.$$.dirty & /*$balances, key*/ 288) {
			$: if ($balances[key]) {
				$$invalidate(0, balance = $balances[key].dp(9).toString());
			} else {
				$$invalidate(0, balance = ``);
			}
		}
	};

	return [balance, yourBalanceClass, symbol, tokenLogo, token];
}

class BalanceSmall extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { token: 4 });
	}
}

export default BalanceSmall;