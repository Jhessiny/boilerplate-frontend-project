import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
import fetch from "node-fetch";

global.fetch = fetch;

chai.use(sinonChai);
sinonStubPromise(sinon);

import {
	search,
	searchAlbuns,
	searchTracks,
	searchPlaylists,
	searchArtists,
} from "../src/main";

describe("Spotify Wrapper", () => {
	describe("Smoke tests", () => {
		it("should exist the search method", () => {
			expect(search).to.exist;
		});

		it("should exist the search method", () => {
			expect(searchArtists).to.exist;
		});

		it("should exist the search method", () => {
			expect(searchAlbuns).to.exist;
		});

		it("should exist the search method", () => {
			expect(searchTracks).to.exist;
		});

		it("should exist the search method", () => {
			expect(searchPlaylists).to.exist;
		});
	});
});

describe("Generic search", () => {
	it("should call fetch", () => {
		const fetchedStub = sinon.stub(global, "fetch");
		const artists = search();

		expect(fetchedStub).to.have.been.calledOnce;

		fetchedStub.restore();
	});

	it("should receive the correct url to fetch", () => {
		const fetchedStub = sinon.stub(global, "fetch");
		const artists = search("Incubus", "artist");

		expect(fetchedStub).to.have.been.calledWith(
			"https://api.spotify.com/v1/search?q=Incubus&type=artist"
		);

		const albuns = search("Incubus", "album")
		expect(fetchedStub).to.have.been.calledWith(
			"https://api.spotify.com/v1/search?q=Incubus&type=album"
		);
	});
});
